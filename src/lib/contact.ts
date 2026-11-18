export type ContactMessage = { name: string; email: string; message: string };
export type DeliveryStatus = "sent" | "error" | "unavailable";
export type ContactState = { status: "idle" | "invalid" | DeliveryStatus };

export function parseContactForm(form: FormData): ContactMessage | null {
  const read = (key: string) => typeof form.get(key) === "string" ? String(form.get(key)).trim() : "";
  const name = read("name");
  const email = read("email");
  const message = read("message");
  if (!name || name.length > 120 || email.length > 200 || message.length < 10 || message.length > 5000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { name, email, message };
}

/** Web3Forms' free plan accepts browser submissions. The public key identifies the owner. */
export async function deliverContactMessage(message: ContactMessage, accessKey: string): Promise<DeliveryStatus> {
  if (!accessKey) return "unavailable";
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...message, access_key: accessKey, subject: `Portfolio — ${message.name}`, from_name: "Marlon Chaviano · Portfolio", botcheck: false }),
      signal: AbortSignal.timeout(15_000),
      cache: "no-store",
    });
    if (!response.ok) return "error";
    const result: { success?: boolean } = await response.json();
    return result.success === true ? "sent" : "error";
  } catch {
    return "error";
  }
}
