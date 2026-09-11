export async function submitToGoogleSheets(data: Record<string, any>) {
  const scriptUrl =
    process.env.GOOGLE_SHEETS_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbzPYxeL-eiA9S5Jpv0Q4Y40wkFbEA9mBBwk5NZI0UmIHO3hb-xxxVvv2J1eVHAvX0owzg/exec';

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Google Sheets Error]:', response.status, text);
    } else {
      console.log('[Google Sheets]: Lead successfully logged to Google Sheet.');
    }
  } catch (error) {
    console.error('[Google Sheets Submission Error]:', error);
  }
}
