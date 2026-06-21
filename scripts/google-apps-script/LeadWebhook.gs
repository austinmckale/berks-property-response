/**
 * Berks Property Response — Google Sheets lead receiver
 *
 * Setup:
 * 1. Create a Google Sheet (e.g. "BPR Leads")
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the /exec URL into LEAD_WEBHOOK_URL (Vercel + .env.local)
 *
 * Browser GET shows status. Site POSTs JSON from /api/submit-lead.
 */

var SHEET_NAME = "Leads";

var HEADERS = [
  "lead_id",
  "created_at",
  "channel",
  "lead_source",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "landing_page",
  "customer_name",
  "phone",
  "email",
  "street_address",
  "city",
  "zip",
  "property_type",
  "service_requested",
  "urgency",
  "problem_type",
  "fixtures_affected",
  "water_or_sewage_present",
  "photo_upload_url",
  "sms_opt_in",
  "partner_share_consent",
  "primary_route",
  "secondary_route",
  "lead_score",
  "qualified_status",
  "disposition",
  "payout_category",
  "payout_rate",
  "payout_due",
  "invoice_month",
  "notes_internal",
];

function doGet() {
  return jsonResponse({
    ok: true,
    service: "Berks Property Response lead webhook",
    hint: "Form submissions use POST with JSON body.",
  });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Missing POST body" });
    }

    var payload = JSON.parse(e.postData.contents);

    if (payload.event !== "lead_submitted" || !payload.sheetRow) {
      return jsonResponse({ ok: false, error: "Expected lead_submitted with sheetRow" });
    }

    var row = payload.sheetRow;
    var sheet = getLeadsSheet();
    ensureHeaders(sheet);

    var values = HEADERS.map(function (key) {
      var val = row[key];
      if (val === undefined || val === null) return "";
      if (Array.isArray(val)) return val.join("; ");
      return val;
    });

    sheet.appendRow(values);

    return jsonResponse({ ok: true, leadId: row.lead_id });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getLeadsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error(
      "No spreadsheet bound to this script. Open your lead sheet → Extensions → Apps Script, paste this code, and redeploy."
    );
  }
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
