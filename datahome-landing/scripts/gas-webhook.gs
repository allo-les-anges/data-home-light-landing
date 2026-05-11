/**
 * DATAhome — Google Apps Script Lead Webhook
 * ============================================
 *
 * This script acts as a web app that receives POST requests from the
 * Next.js API route (/api/leads) and does two things:
 *   1. Appends the lead data to a Google Sheet for tracking.
 *   2. Sends an email notification to the agency owner.
 *
 * HOW TO DEPLOY:
 *   1. Open Google Apps Script: script.google.com
 *   2. Paste this entire file into the editor.
 *   3. Update the SHEET_ID and NOTIFICATION_EMAILS constants below.
 *   4. Click Deploy > New deployment > Web app.
 *      - Execute as: "Me"
 *      - Who has access: "Anyone" (so the Next.js server can reach it)
 *   5. Copy the web app URL and add it to your .env.local:
 *        GAS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 *        WEBHOOK_SECRET=your-secret-here
 *   6. Each time you change this script, create a NEW deployment version.
 *
 * SHEET STRUCTURE (created automatically on first run):
 *   Timestamp | Source | Name | Email | Phone | Plan | Message | Template | Page URL | UTM Source | UTM Medium | UTM Campaign
 */

// ─── Configuration ────────────────────────────────────────────────────────────

/** The ID found in your Google Sheet URL: /spreadsheets/d/SHEET_ID/edit */
var SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";

/** The sheet (tab) name where leads will be written */
var SHEET_NAME = "Leads";

/** Email addresses that receive lead notifications */
var NOTIFICATION_EMAILS = ["gillian@amaru-homes.com", "gaetan@amaru-homes.com"];

/** Must match the WEBHOOK_SECRET variable in your Next.js .env.local */
var WEBHOOK_SECRET = "your-webhook-secret-here";

// ─── Column headers (order matters — matches appendRow calls below) ───────────

var HEADERS = [
  "Timestamp",
  "Source",
  "Name",
  "Email",
  "Phone",
  "Plan",
  "Message",
  "Template",
  "Page URL",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
];

// ─── Main handler ─────────────────────────────────────────────────────────────

/**
 * doPost is the entry point for all HTTP POST requests to this web app.
 * Google Apps Script calls this function automatically.
 *
 * @param {GoogleAppsScript.Events.DoPost} e - The event object containing request data.
 * @returns {GoogleAppsScript.Content.TextOutput} JSON response back to the caller.
 */
function doPost(e) {
  try {
    // Authenticate the request using the shared secret in the header
    var secret = e.parameter["X-Webhook-Secret"] || (e.headers && e.headers["X-Webhook-Secret"]);
    if (secret !== WEBHOOK_SECRET) {
      return buildResponse(false, "Unauthorized request.", 403);
    }

    // Parse the JSON body sent by the Next.js API route
    var payload = JSON.parse(e.postData.contents);

    // Write the lead to the spreadsheet
    appendLeadToSheet(payload);

    // Send an email notification to the agency owner
    sendNotificationEmail(payload);

    return buildResponse(true, "Lead processed successfully.");

  } catch (error) {
    // Log to Apps Script execution log so you can debug in the GAS editor
    Logger.log("Error in doPost: " + error.toString());
    return buildResponse(false, "Server error: " + error.message);
  }
}

// ─── Sheet helpers ────────────────────────────────────────────────────────────

/**
 * Opens the target spreadsheet and appends one row with the lead data.
 * If the sheet doesn't exist yet, it creates one and adds headers first.
 *
 * @param {Object} payload - The LeadPayload object from the Next.js API.
 */
function appendLeadToSheet(payload) {
  var spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  // Create the sheet and add headers if this is the first lead
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);

    // Freeze the header row so it stays visible when scrolling down
    sheet.setFrozenRows(1);

    // Bold the header row for readability
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }

  var meta = payload.metadata || {};

  // Append one row — order must match HEADERS array above
  sheet.appendRow([
    payload.timestamp,
    payload.source,
    payload.name,
    payload.email,
    payload.phone    || "",
    payload.plan     || "",
    payload.message  || "",
    meta.template    || "",
    meta.page_url    || "",
    meta.utm_source  || "",
    meta.utm_medium  || "",
    meta.utm_campaign || "",
  ]);
}

// ─── Email notification ───────────────────────────────────────────────────────

/**
 * Sends a plain-text email to the configured recipients with the lead details.
 * The format is intentionally simple so it is easy to read on mobile.
 *
 * @param {Object} payload - The LeadPayload object.
 */
function sendNotificationEmail(payload) {
  var recipients = payload.recipients && payload.recipients.length
    ? payload.recipients
    : NOTIFICATION_EMAILS;
  var subject = "🏠 Nouveau lead DATAhome — " + payload.name;

  var lines = [
    "Un nouveau lead vient d'être reçu sur data-home.app.",
    "",
    "─────────────────────────────",
    "Nom    : " + payload.name,
    "Email  : " + payload.email,
    "Tél    : " + (payload.phone   || "—"),
    "Source : " + payload.source,
    "Plan   : " + (payload.plan    || "—"),
    "─────────────────────────────",
  ];

  if (payload.message) {
    lines.push("Message :");
    lines.push(payload.message);
    lines.push("─────────────────────────────");
  }

  var meta = payload.metadata || {};
  if (meta.page_url) {
    lines.push("Page     : " + meta.page_url);
  }
  if (meta.utm_source) {
    lines.push("UTM      : " + meta.utm_source + " / " + (meta.utm_medium || "—") + " / " + (meta.utm_campaign || "—"));
  }

  lines.push("");
  lines.push("Reçu le : " + new Date(payload.timestamp).toLocaleString("fr-FR"));

  MailApp.sendEmail({
    to: recipients.join(","),
    subject: subject,
    body: lines.join("\n"),
  });
}

// ─── Utility ──────────────────────────────────────────────────────────────────

/**
 * Builds a JSON response. GAS web apps must return a TextOutput object.
 *
 * @param {boolean} success
 * @param {string}  message
 * @param {number}  [status] - Unused by GAS (it always returns 200), but kept
 *                            for documentation parity with the Next.js API response.
 */
function buildResponse(success, message, status) {
  var output = ContentService.createTextOutput(
    JSON.stringify({ success: success, message: message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
