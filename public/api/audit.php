<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Helper function to write to server log file
function writeAuditLog($message, $data = null) {
    $logFile = __DIR__ . '/audit_debug.log';
    $time = date('Y-m-d H:i:s');
    $logMsg = "[{$time}] {$message}";
    if ($data !== null) {
        $logMsg .= " | " . (is_array($data) || is_object($data) ? json_encode($data) : $data);
    }
    $logMsg .= "\n";
    @file_put_contents($logFile, $logMsg, FILE_APPEND);
}

writeAuditLog("=== NEW FORM SUBMISSION ===");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    writeAuditLog("ERROR: Invalid request method " . $_SERVER['REQUEST_METHOD']);
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    writeAuditLog("ERROR: Invalid or empty JSON payload", $input);
    echo json_encode(["success" => false, "message" => "Invalid payload"]);
    exit;
}

writeAuditLog("Payload received", $data);

$name = isset($data['name']) ? htmlspecialchars(trim($data['name'])) : 'N/A';
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : 'N/A';
$phone = isset($data['phone']) ? htmlspecialchars(trim($data['phone'])) : 'N/A';
$website = isset($data['website']) ? htmlspecialchars(trim($data['website'])) : 'N/A';
$spend = isset($data['spend']) ? htmlspecialchars(trim($data['spend'])) : 'Not started';
$objective = isset($data['objective']) ? htmlspecialchars(trim($data['objective'])) : 'N/A';
$channels = isset($data['channels']) ? htmlspecialchars(trim($data['channels'])) : 'N/A';
$formType = isset($data['formType']) ? htmlspecialchars(trim($data['formType'])) : 'Audit Form';
$submittedAt = isset($data['submittedAt']) ? htmlspecialchars(trim($data['submittedAt'])) : date('d/m/Y, h:i:s a');

$logoImgSrc = 'https://averomedia.in/logo.png';
$formattedWebsite = (strpos($website, 'http') === 0) ? $website : 'https://' . $website;

// Robust SMTP Email Function with Port 465 (SSL) and Port 587 (STARTTLS) Fallback
function sendSmtpEmail($to, $subject, $htmlContent, $replyTo = '', $cc = '') {
    $host = 'mail.averomedia.in';
    $user = 'info@averomedia.in';
    $pass = 'Ravindra_1702';
    $fromName = 'AVERO Performance Marketing';
    $fromEmail = 'info@averomedia.in';

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);

    $socket = null;
    $connectedPort = 0;

    // 1. Try Port 465 (SSL) first
    writeAuditLog("Connecting to SMTP ssl://{$host}:465...");
    $socket = @stream_socket_client("ssl://{$host}:465", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);
    if ($socket) {
        $connectedPort = 465;
        writeAuditLog("SMTP connected successfully on Port 465 (SSL)");
    } else {
        writeAuditLog("SMTP Port 465 failed: {$errstr} ({$errno}). Trying Port 587 (TLS)...");
        $socket = @stream_socket_client("tcp://{$host}:587", $errno, $errstr, 10, STREAM_CLIENT_CONNECT, $context);
        if ($socket) {
            $connectedPort = 587;
            writeAuditLog("SMTP connected successfully on Port 587 (TLS)");
        }
    }

    if (!$socket) {
        writeAuditLog("FATAL: Could not connect to SMTP server on port 465 or 587. Errmsg: {$errstr}");
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
        if (!empty($cc)) $headers .= "Cc: {$cc}\r\n";
        if (!empty($replyTo)) $headers .= "Reply-To: {$replyTo}\r\n";
        $mailRes = @mail($to, $subject, $htmlContent, $headers);
        writeAuditLog("Fallback php mail() attempt result: " . ($mailRes ? "SUCCESS" : "FAILED"));
        return $mailRes;
    }

    $read = function($sock) {
        $resp = '';
        while ($line = fgets($sock, 512)) {
            $resp .= $line;
            if (substr($line, 3, 1) == ' ') break;
        }
        return $resp;
    };

    $send = function($sock, $cmd) use ($read) {
        fputs($sock, $cmd . "\r\n");
        $res = $read($sock);
        writeAuditLog("SMTP CMD > {$cmd} | RES < " . trim($res));
        return $res;
    };

    $banner = $read($socket);
    writeAuditLog("SMTP Banner: " . trim($banner));

    $send($socket, "EHLO " . gethostname());

    if ($connectedPort === 587) {
        $send($socket, "STARTTLS");
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $send($socket, "EHLO " . gethostname());
    }

    $send($socket, "AUTH LOGIN");
    $send($socket, base64_encode($user));
    $authRes = $send($socket, base64_encode($pass));

    if (strpos($authRes, '235') === false) {
        writeAuditLog("ERROR: SMTP Authentication failed! Response: " . trim($authRes));
        fclose($socket);
        return false;
    }

    $send($socket, "MAIL FROM: <{$fromEmail}>");
    $send($socket, "RCPT TO: <{$to}>");
    if (!empty($cc)) {
        $send($socket, "RCPT TO: <{$cc}>");
    }

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "To: <{$to}>\r\n";
    if (!empty($cc)) {
        $headers .= "Cc: <{$cc}>\r\n";
    }
    if (!empty($replyTo)) {
        $headers .= "Reply-To: <{$replyTo}>\r\n";
    }
    $headers .= "Subject: {$subject}\r\n";

    $message = $headers . "\r\n" . $htmlContent . "\r\n.";
    $send($socket, "DATA");
    $dataRes = $send($socket, $message);
    writeAuditLog("SMTP Email sent to {$to}. Result: " . trim($dataRes));

    $send($socket, "QUIT");
    fclose($socket);

    return true;
}

// 1. Admin Lead Alert HTML Email
$adminSubject = "🚨 New Lead: " . $name . " (" . $website . ") - " . $formType;

$adminHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>' .
  '<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">' .
  '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9; padding: 40px 15px;">' .
  '<tr><td align="center">' .
  '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(18,59,109,0.06);">' .
  '<tr><td align="center" style="padding: 28px 24px 20px 24px; background-color: #FFFFFF; border-bottom: 3px solid #D4AF37;">' .
  '<a href="https://averomedia.in" target="_blank"><img src="' . $logoImgSrc . '" alt="AVERO Performance Marketing" width="130" style="max-height: 42px; width: auto; display: block; margin: 0 auto; border: 0;" /></a>' .
  '<h3 style="color: #123B6D; font-size: 18px; font-weight: 800; margin: 12px 0 0 0;">🔥 NEW AUDIT LEAD RECEIVED</h3>' .
  '<div style="margin-top: 8px;"><span style="background-color: #FEF3C7; color: #B45309; border: 1px solid #FCD34D; font-size: 11px; text-transform: uppercase; border-radius: 20px; padding: 3px 12px; font-weight: 700; display: inline-block;">Source: ' . $formType . '</span></div>' .
  '</td></tr>' .
  '<tr><td style="padding: 28px 28px 24px 28px; background-color: #FFFFFF;">' .
  '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden;">' .
  '<tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;"><td width="36%" style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Full Name:</td><td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">' . $name . '</td></tr>' .
  '<tr style="border-bottom: 1px solid #E2E8F0;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Work Email:</td><td style="padding: 12px 16px; font-size: 14px;"><a href="mailto:' . $email . '" style="color: #123B6D; font-weight: 700; text-decoration: none;">' . $email . '</a></td></tr>' .
  '<tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Phone Number:</td><td style="padding: 12px 16px; font-size: 14px;"><a href="tel:' . $phone . '" style="color: #123B6D; font-weight: 700; text-decoration: none;">' . $phone . '</a></td></tr>' .
  '<tr style="border-bottom: 1px solid #E2E8F0;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Website URL:</td><td style="padding: 12px 16px; font-size: 14px;"><a href="' . $formattedWebsite . '" target="_blank" style="color: #123B6D; font-weight: 700; text-decoration: underline;">' . $website . '</a></td></tr>' .
  '<tr style="background-color: #F8FAFC; border-bottom: 1px solid #E2E8F0;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Monthly Spend:</td><td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">' . $spend . '</td></tr>' .
  '<tr style="border-bottom: 1px solid #E2E8F0;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Objective:</td><td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">' . $objective . '</td></tr>' .
  '<tr style="background-color: #F8FAFC;"><td style="padding: 12px 16px; color: #64748B; font-weight: 600; font-size: 13px;">Ad Channels:</td><td style="padding: 12px 16px; color: #0F172A; font-weight: 700; font-size: 14px;">' . $channels . '</td></tr>' .
  '</table>' .
  '<div style="margin-top: 24px; text-align: center;">' .
  '<a href="tel:' . $phone . '" style="display: inline-block; background-color: #123B6D; color: #FFFFFF; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px; margin-right: 8px;">📞 Call Lead Now</a>' .
  '<a href="mailto:' . $email . '" style="display: inline-block; background-color: #F1F5F9; color: #1E293B; border: 1px solid #CBD5E1; font-weight: 700; font-size: 13px; text-decoration: none; padding: 10px 20px; border-radius: 6px;">✉️ Reply by Email</a>' .
  '</div></td></tr>' .
  '<tr><td style="padding: 18px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;"><p style="margin: 0; font-size: 12px; color: #64748B; font-weight: 500;">AVERO Lead Dispatch System</p></td></tr>' .
  '</table></td></tr></table></body></html>';

$adminEmail = "info@averomedia.in";
$adminCc = "asolkarviraj@gmail.com";

writeAuditLog("Dispatching Admin Email to {$adminEmail} (CC: {$adminCc})");
$adminRes = sendSmtpEmail($adminEmail, $adminSubject, $adminHtml, $email, $adminCc);
writeAuditLog("Admin Email Dispatch Result: " . ($adminRes ? "SUCCESS" : "FAILED"));

// 2. Customer Confirmation HTML Email
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $userSubject = "Audit Request Received for " . $website . " - AVERO";
    $userHtml = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>' .
      '<body style="margin: 0; padding: 0; background-color: #F4F6F9; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #1E293B;">' .
      '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F4F6F9; padding: 40px 15px;">' .
      '<tr><td align="center">' .
      '<table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(18,59,109,0.06);">' .
      '<tr><td align="center" style="padding: 32px 24px 20px 24px; background-color: #FFFFFF; border-bottom: 3px solid #D4AF37;">' .
      '<a href="https://averomedia.in" target="_blank"><img src="' . $logoImgSrc . '" alt="AVERO Performance Marketing" width="130" style="max-height: 42px; width: auto; display: block; margin: 0 auto; border: 0;" /></a>' .
      '<p style="margin: 10px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #123B6D; font-weight: 700;">Find the leak &middot; Fix the problem &middot; Scale what works</p>' .
      '</td></tr>' .
      '<tr><td style="padding: 36px 32px 30px 32px; background-color: #FFFFFF;">' .
      '<div style="display: inline-block; background-color: #FEF3C7; border: 1px solid #FCD34D; border-radius: 20px; padding: 4px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #92400E; font-weight: 700; margin-bottom: 20px;">Audit Request Confirmed</div>' .
      '<h2 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #123B6D; line-height: 1.35;">Thank you! We have received your audit request.</h2>' .
      '<p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">Hi ' . $name . ',<br><br>Our growth team is reviewing your ad setup for <strong>' . $website . '</strong> and will reach out to you within 24 hours.</p>' .
      '<p style="margin: 0 0 14px 0; font-size: 14px; color: #475569;">Need faster assistance or want to talk to our strategy team immediately?</p>' .
      '<div><a href="https://wa.me/918692918021" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 24px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);">Chat on WhatsApp: +91 8692918021 &rarr;</a></div>' .
      '</td></tr>' .
      '<tr><td style="padding: 20px 24px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;"><p style="margin: 0; font-size: 12px; color: #64748B; font-weight: 500;">&copy; ' . date('Y') . ' AVERO Performance Marketing. All rights reserved.</p></td></tr>' .
      '</table></td></tr></table></body></html>';

    writeAuditLog("Dispatching Customer Confirmation Email to {$email}");
    $userRes = sendSmtpEmail($email, $userSubject, $userHtml, 'info@averomedia.in');
    writeAuditLog("Customer Email Dispatch Result: " . ($userRes ? "SUCCESS" : "FAILED"));
}

// 3. Log to Google Sheets in background via Google Apps Script URL
$scriptUrl = isset($data['googleSheetUrl']) && !empty($data['googleSheetUrl']) ? $data['googleSheetUrl'] : '';

// Unset googleSheetUrl before forwarding payload so Google Sheets does not create extra columns
if (isset($data['googleSheetUrl'])) {
    unset($data['googleSheetUrl']);
}

if (!empty($scriptUrl)) {
    writeAuditLog("Posting lead payload to Google Sheets script URL: {$scriptUrl}");
    $ch = curl_init($scriptUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    $sheetRes = @curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    @curl_close($ch);
    writeAuditLog("Google Sheets cURL HTTP Code: {$httpCode} | Error: {$curlErr} | Response: {$sheetRes}");
}

writeAuditLog("=== SUBMISSION COMPLETE ===");
echo json_encode(["success" => true, "message" => "Lead processed successfully via MilesWeb SMTP"]);
