// ============================================================
// Google Apps Script — Workshop Registration Form Handler
// Deploy as Web App to receive POST requests from HTML form
// ============================================================

// ─── CONFIGURATION (edit these) ──────────────────────────────
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Registrations';                  // Must match your sheet tab name
// ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      return buildResponse({ result: 'error', message: 'Sheet not found: ' + SHEET_NAME });
    }

    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });

    const row = [
      timestamp,
      data.fullName    || '',
      data.email       || '',
      data.phone       || '',
      data.company     || '',
      data.jobTitle    || '',
      data.hearAbout   || '',
      data.message     || ''
    ];

    sheet.appendRow(row);

    return buildResponse({ result: 'success' });

  } catch (error) {
    return buildResponse({ result: 'error', message: error.toString() });
  }
}

// Handle CORS preflight (GET fallback)
function doGet(e) {
  return buildResponse({ result: 'ready', message: 'Form endpoint is live.' });
}

function buildResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// DEPLOYMENT INSTRUCTIONS
// ============================================================
//
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire file into Code.gs (replace any existing code)
// 3. Update SPREADSHEET_ID with your Google Sheet's ID
//    (the long string in the Sheet URL between /d/ and /edit)
// 4. Click Deploy → New deployment
// 5. Select type: "Web app"
// 6. Settings:
//    - Description: "Workshop Registration"
//    - Execute as: "Me" (your Google account)
//    - Who has access: "Anyone" (important! allows public form submissions)
// 7. Click "Deploy" → Authorize access when prompted
// 8. Copy the Web App URL — paste it into the FORM_ENDPOINT constant
//    in the HTML form's JavaScript section
//
// IMPORTANT: Every time you edit this script, you must create a
// NEW deployment (Deploy → New deployment) for changes to take effect.
// "Manage deployments" → edit existing does NOT always pick up changes.
//
// ============================================================
// GOOGLE SHEET SETUP
// ============================================================
//
// Create a Google Sheet with these column headers in Row 1:
//
// | A         | B         | C     | D     | E       | F         | G              | H       |
// |-----------|-----------|-------|-------|---------|-----------|----------------|---------|
// | Timestamp | Full Name | Email | Phone | Company | Job Title | Heard About Us | Message |
//
// - Rename the sheet tab to "Registrations" (must match SHEET_NAME above)
// - Copy the Spreadsheet ID from the URL and paste into SPREADSHEET_ID above
//
// ============================================================
// ZAPIER CONNECTION
// ============================================================
//
// After the Apps Script is deployed and the Sheet is receiving data:
//
// 1. In Zapier, create a new Zap
// 2. Trigger app: "Google Sheets"
// 3. Trigger event: "New Spreadsheet Row"
// 4. Connect your Google account and select the spreadsheet
// 5. Select the "Registrations" sheet
// 6. Zapier will watch for new rows — each new registration adds a row
//
// Recommended: Use the "Email" column (C) as the key identifier
// for downstream actions (email confirmation, CRM entry, etc.)
//
// Example Zapier actions:
// - Send confirmation email via Gmail/Mailchimp
// - Add contact to CRM (HubSpot, etc.)
// - Send Slack notification to team channel
// ============================================================
