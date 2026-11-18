"use client";

import { useActionState, useRef, useState } from "react";
import { deliverContactMessage, parseContactForm, type ContactState } from "@/lib/contact";

type Labels = {
  name: string;
  nameHint: string;
  email: string;
  emailHint: string;
  message: string;
  send: string;
  sendWhatsapp: string;
  sending: string;
  sent: string;
  error: string;
  invalid: string;
  unavailable: string;
  greeting: string;
  messageHint: string;
};

const initial: ContactState = { status: "idle" };
const field =
  "contact-field";

/** Send in place; keep the visitor's draft intact if delivery fails. */
export function ContactForm({
  labels,
  accessKey,
  whatsapp,
}: {
  labels: Labels;
  accessKey: string;
  whatsapp: string;
}) {
  const [state, action, pending] = useActionState(async (_: ContactState, data: FormData): Promise<ContactState> => {
    if (data.get("company")) return { status: "sent" };
    const message = parseContactForm(data);
    if (!message) return { status: "invalid" };
    return { status: await deliverContactMessage(message, accessKey) };
  }, initial);
  const [localError, setLocalError] = useState(false);
  const [draft, setDraft] = useState({ name: "", email: "", message: "" });
  const form = useRef<HTMLFormElement>(null);

  const read = () => {
    const data = new FormData(form.current!);
    return {
      name: String(data.get("name") ?? "").trim(),
      from: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
  };

  const compose = () => {
    if (!form.current?.reportValidity()) return null;
    const { name, from, message } = read();
    if (!name || message.length < 10) {
      setLocalError(true);
      return null;
    }
    setLocalError(false);
    return { name, from, text: `${labels.greeting} ${name}.\n\n${message}${from ? `\n\n${from}` : ""}` };
  };

  const viaWhatsapp = () => {
    const composed = compose();
    if (composed) window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(composed.text)}`, "_blank", "noopener");
  };

  if (state.status === "sent") {
    return (
      <p role="status" className="display text-4xl">
        {labels.sent}
      </p>
    );
  }

  const error = localError ? labels.invalid : state.status !== "idle" ? labels[state.status] : null;

  return (
    <form ref={form} action={action} onSubmit={() => setLocalError(false)} aria-busy={pending} className="relative grid content-start gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          {labels.name}
          <input name="name" required autoComplete="name" maxLength={120} placeholder={labels.nameHint} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} readOnly={pending} className={field} />
        </label>
        <label className="block text-sm">
          {labels.email}
          <input name="email" type="email" autoComplete="email" maxLength={200} placeholder={labels.emailHint} required value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} readOnly={pending} className={field} />
        </label>
      </div>
      <label className="block text-sm">
        {labels.message}
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={labels.messageHint} value={draft.message} onChange={(event) => setDraft({ ...draft, message: event.target.value })} readOnly={pending} className={`${field} resize-y`} />
      </label>
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          data-sound="place"
          className="btn btn-primary"
        >
          {pending ? labels.sending : labels.send}
        </button>
        {whatsapp && <button type="button" onClick={viaWhatsapp} disabled={pending} data-sound="place" className="btn">
          {labels.sendWhatsapp} ↗
        </button>}
      </div>
      {error && (
        <p role="alert" className="text-sm">
          {error}
        </p>
      )}
    </form>
  );
}
