"use server";

export async function subscribe(
  _prev: { success: boolean; message: string } | null,
  formData: FormData,
) {
  const email = formData.get("email");

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, message: "Newsletter signup is not configured." };
  }

  const res = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      unsubscribed: false,
      signup_source: "cjroth.com",
      ...(process.env.RESEND_SEGMENT_ID
        ? { segments: [process.env.RESEND_SEGMENT_ID] }
        : {}),
    }),
  });

  if (res.status === 409) {
    return { success: true, message: "You're already subscribed!" };
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    console.error("Resend API error:", res.status, body);
    return { success: false, message: "Something went wrong. Please try again." };
  }

  return { success: true, message: "You're subscribed!" };
}
