const admin = require("firebase-admin");

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

// Next.js API route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" }); // Only allow POST requests
  }

  const { accountId } = req.body;
  if (!accountId) {
    return res.status(400).json({ error: "Account ID is required" });
  }

  try {
    const customToken = await generateCustomToken(accountId);
    res.status(200).json({ customToken });
  } catch (error) {
    if (error.message === "Account ID does not exist in the database.") {
      return res.status(404).json({ error: "Account ID not found" });
    }
    res.status(500).json({ error: "Failed to generate custom token" });
  }
}