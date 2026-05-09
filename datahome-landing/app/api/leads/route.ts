/**
 * POST /api/leads
 *
 * Receives a lead submission from any form on the landing page,
 * validates the payload, then forwards it to a Google Apps Script
 * web app that writes the data to a Google Sheet and sends an email alert.
 *
 * Environment variables required (add to .env.local):
 *   GAS_WEBHOOK_URL  — the URL of your deployed GAS web app
 *   WEBHOOK_SECRET   — a shared secret to authenticate requests from this server
 *
 * Flow:
 *   Browser form  →  POST /api/leads  →  Google Apps Script  →  Google Sheet + Email
 */

import { NextRequest, NextResponse } from "next/server"

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * All possible lead sources on the landing page.
 * Keeping this as a union type means TypeScript catches typos at compile time.
 */
export type LeadSource = "contact_form" | "pricing_cta" | "alert_signup" | "demo_request"

/**
 * The full payload sent to this route and forwarded to Google Apps Script.
 * The GAS `doPost()` function expects exactly this shape — keep both in sync.
 */
export interface LeadPayload {
  source: LeadSource
  name: string
  email: string
  phone?: string
  message?: string
  /** Pricing plan the user clicked (only present for pricing_cta source) */
  plan?: "silver" | "gold" | "platinum"
  /** ISO 8601 timestamp — easier to parse in GAS with `new Date(timestamp)` */
  timestamp: string
  metadata: {
    /** Which template the user viewed before submitting */
    template?: string
    /** Full URL of the page where the form was submitted */
    page_url?: string
    /** UTM parameters forwarded from the landing page URL */
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
  }
}

/** Shape of the JSON response returned to the browser */
interface ApiResponse {
  success: boolean
  message: string
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Checks that the required fields are present and not empty.
 * Returns an error message string, or null if everything is valid.
 */
function validatePayload(body: unknown): string | null {
  if (!body || typeof body !== "object") return "Request body must be a JSON object."

  const { name, email, source } = body as Partial<LeadPayload>

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return "Field 'name' is required and must be at least 2 characters."
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Field 'email' must be a valid email address."
  }
  if (!source) {
    return "Field 'source' is required."
  }

  return null
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // Parse the incoming JSON body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 })
  }

  // Validate required fields before doing anything else
  const validationError = validatePayload(body)
  if (validationError) {
    return NextResponse.json({ success: false, message: validationError }, { status: 422 })
  }

  // Build the final payload — we always generate the timestamp server-side
  // so it cannot be spoofed by the client.
  const payload: LeadPayload = {
    ...(body as Omit<LeadPayload, "timestamp">),
    timestamp: new Date().toISOString(),
  }

  // Forward to the Google Apps Script webhook
  const gasUrl = process.env.GAS_WEBHOOK_URL
  if (!gasUrl) {
    // In development without a GAS URL, log and return success so the UI still works.
    console.warn("[leads] GAS_WEBHOOK_URL is not set — skipping webhook forward.")
    console.log("[leads] Payload:", JSON.stringify(payload, null, 2))
    return NextResponse.json({ success: true, message: "Lead received (webhook not configured)." })
  }

  try {
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The GAS script checks this header to reject unauthorized requests
        "X-Webhook-Secret": process.env.WEBHOOK_SECRET ?? "",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error("[leads] GAS webhook returned an error:", response.status, await response.text())
      return NextResponse.json(
        { success: false, message: "Lead saved, but notification failed. We will follow up." },
        { status: 502 },
      )
    }
  } catch (error) {
    // Network error reaching GAS — still log, don't lose the lead
    console.error("[leads] Failed to reach GAS webhook:", error)
    return NextResponse.json(
      { success: false, message: "Network error forwarding lead." },
      { status: 502 },
    )
  }

  return NextResponse.json({ success: true, message: "Lead received successfully." })
}

// Reject GET requests — this endpoint only accepts POST
export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json({ success: false, message: "Method not allowed." }, { status: 405 })
}
