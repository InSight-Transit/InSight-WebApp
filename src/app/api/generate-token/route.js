import admin from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

async function generateCustomToken(accountId) {
  try {
    // Generate a custom token for the given Account ID (uid)
    const customToken = await admin.auth().createCustomToken(accountId);
    return customToken;
  } catch (error) {
    console.error("Error generating custom token:", error);
    throw error;
  }
}

// Named export for the POST method
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { accountId } = body;

    if (!accountId) {
      return new Response(JSON.stringify({ error: "Account ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const customToken = await generateCustomToken(accountId);

    return new Response(JSON.stringify({ customToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST /generate-token:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate custom token" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}