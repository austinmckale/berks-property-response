import { afterEach, describe, expect, it, vi } from "vitest";
import { captureLead } from "@/lib/leadCapture";
import type { LeadFormData } from "@/lib/formSchema";
import type { RouteResult } from "@/lib/routing";
import type { WebhookPayload } from "@/lib/webhookMapper";

const form = {
  problemType: "plumbing-leak",
  name: "Test User",
  phone: "4845550100",
  city: "Reading",
  problemDescription: "Test leak under kitchen sink for capture flow.",
} as LeadFormData;

const routing: RouteResult = {
  leadId: "BPR-20260621-102000-4821",
  primaryRoute: "evan",
  secondaryRoute: null,
  leadScore: 40,
  qualifiedStatus: "needs_review",
  suggestedSLA: "Same business day",
  serviceCategory: "plumbing",
  payoutCategory: "Local plumbing provider lead",
  notesInternal: [],
};

const webhookPayload = {
  event: "lead_submitted",
  timestamp: "2026-06-21T14:20:00.000Z",
  sheetRow: { lead_id: routing.leadId },
} as WebhookPayload;

describe("captureLead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("succeeds when Google Sheets captures even if Discord fails", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://sheets.example/webhook");
    vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.example/webhook");

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true, leadId: routing.leadId }), {
          status: 200,
        })
      )
      .mockResolvedValueOnce(new Response("", { status: 500 }));

    vi.stubGlobal("fetch", fetchMock);

    const result = await captureLead({ form, routing, webhookPayload });

    expect(result.captured).toBe(true);
    expect(result.destinations.googleSheets.ok).toBe(true);
    expect(result.destinations.discord.ok).toBe(false);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://sheets.example/webhook");
  });

  it("does not treat Discord-only success as durable capture when Sheets fails", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://sheets.example/webhook");
    vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.example/webhook");

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: false, error: "sheet error" }), {
          status: 500,
        })
      )
      .mockResolvedValueOnce(new Response("", { status: 200 }));

    vi.stubGlobal("fetch", fetchMock);

    const result = await captureLead({ form, routing, webhookPayload });

    expect(result.captured).toBe(false);
    expect(result.destinations.googleSheets.ok).toBe(false);
    expect(result.destinations.discord.ok).toBe(true);
  });

  it("does not report captured when every configured destination fails", async () => {
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://sheets.example/webhook");
    vi.stubEnv("DISCORD_WEBHOOK_URL", "https://discord.example/webhook");

    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("", { status: 500 }));

    vi.stubGlobal("fetch", fetchMock);

    const result = await captureLead({ form, routing, webhookPayload });

    expect(result.captured).toBe(false);
    expect(result.destinations.googleSheets.ok).toBe(false);
    expect(result.destinations.discord.ok).toBe(false);
  });
});
