"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { consentStorageKey, readConsentChoice } from "@/lib/marketing/legal";

export function ConsentAwareAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(readConsentChoice(localStorage.getItem(consentStorageKey)) === "all");
    update();
    window.addEventListener("datahome:consent-change", update);
    return () => window.removeEventListener("datahome:consent-change", update);
  }, []);

  return enabled ? <Analytics /> : null;
}
