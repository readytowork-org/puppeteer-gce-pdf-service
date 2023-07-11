const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  projectId: process?.env?.ASIA_NORTHEAST1_PROJECT_ID,
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process?.env?.ASIA_NORTHEAST1_GCE_FIREBASE_STORAGE_BUCKET,
});

const storage = admin.storage();

module.exports = { storage };
