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

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return { success: false, message: "Newsletter signup is not configured." };
  }

  const res = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    },
  );

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
