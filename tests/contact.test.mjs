import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContactForm, deliverContactMessage } from "../src/lib/contact.ts";

const message = { name: "Visitor", email: "visitor@example.com", message: "I'd like to discuss a project." };

test("contact validation rejects malformed or oversized input", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(message)) form.set(key, ` ${value} `);
  assert.deepEqual(parseContactForm(form), message);
  form.set("email", "invalid");
  assert.equal(parseContactForm(form), null);
  form.set("email", message.email);
  form.set("message", "short");
  assert.equal(parseContactForm(form), null);
  form.set("message", "x".repeat(5001));
  assert.equal(parseContactForm(form), null);
});

test("delivery routes to the owner and includes the visitor's reply address", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.web3forms.com/submit");
    assert.equal(options.method, "POST");
    assert.equal(options.signal.aborted, false);
    assert.deepEqual(JSON.parse(options.body), { ...message, access_key: "test-public-key", subject: "Portfolio — Visitor", from_name: "Marlon Chaviano · Portfolio", botcheck: false });
    return Response.json({ success: true, message: "Email sent successfully." });
  });
  assert.equal(await deliverContactMessage(message, "test-public-key"), "sent");
});

test("missing configuration and provider rejection never report successful delivery", async (t) => {
  const responses = [
    { success: false, message: "Invalid access key." },
    { success: "false", message: "Unable to send." },
    { success: true, message: "Email sent successfully." },
  ];
  const request = t.mock.method(globalThis, "fetch", async () => Response.json(responses.shift()));
  assert.equal(await deliverContactMessage(message, ""), "unavailable");
  assert.equal(request.mock.callCount(), 0);
  assert.equal(await deliverContactMessage(message, "test-public-key"), "error");
  assert.equal(await deliverContactMessage(message, "test-public-key"), "error");
  assert.equal(await deliverContactMessage(message, "test-public-key"), "sent");
});

test("HTTP errors, invalid responses and network failures remain retryable", async (t) => {
  const responses = [new Response("Unavailable", { status: 503 }), new Response("not JSON")];
  t.mock.method(globalThis, "fetch", async () => {
    if (responses.length) return responses.shift();
    throw new Error("Network unavailable");
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    assert.equal(await deliverContactMessage(message, "test-public-key"), "error");
  }
});
