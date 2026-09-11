import { submitToGoogleSheets } from '../lib/googleSheets.js';

const testData = {
  submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  formType: 'Hero Form',
  name: 'Viraj Asolkar',
  email: 'virajasolkar0181@gmail.com',
  website: 'www.viraj.com',
  phone: '9372303043',
  spend: 'Not started',
  objective: 'N/A',
  channels: 'N/A'
};

console.log('Sending test data to Google Sheets...');
submitToGoogleSheets(testData).then(() => console.log('Done test.'));
