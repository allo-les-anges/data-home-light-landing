export const legalIdentity = {
  brand: "DATAhome",
  website: "data-home.app",
  operator: "Gaëtan Mukeba-Harchies",
  status: "Individual entrepreneur / self-employed (autónomo), Spain",
  address: ["Alcolechia 47", "Alicante", "Spain"],
  taxId: "NIE/NIF Z4194120Y",
  contactEmail: "info@data-home.app",
  contactRetentionMonths: 12,
} as const;

export const consentStorageKey = "datahome_cookie_consent_v1";
export type ConsentChoice = "all" | "essential";

export function readConsentChoice(value: string | null): ConsentChoice | null {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (parsed && typeof parsed === "object" && "choice" in parsed) {
      const choice = (parsed as { choice?: unknown }).choice;
      return choice === "all" || choice === "essential" ? choice : null;
    }
  } catch {}
  return null;
}
