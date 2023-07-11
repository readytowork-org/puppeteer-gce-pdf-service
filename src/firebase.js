const admin = require("firebase-admin");
const dotenv = require("dotenv");
const path = require("path");
const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });

const serviceAccountBuffer = Buffer.from(
  process.env.ASIA_NORTHEAST1_SERVICE_ACCOUNT_KEY,
  "base64"
);
const serviceAccountString = serviceAccountBuffer.toString("utf-8");

admin.initializeApp({
  projectId: process?.env?.ASIA_NORTHEAST1_PROJECT_ID,
  credential: admin.credential.cert(JSON.parse(serviceAccountString)),
  storageBucket: process?.env?.ASIA_NORTHEAST1_GCE_FIREBASE_STORAGE_BUCKET,
});

const storage = admin.storage();

module.exports = { storage };
