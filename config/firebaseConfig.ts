import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();


const serviceAccount: ServiceAccount = {
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle newlines in private key
  };
// This step is necessary before you can use any Firebase services
initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
// This creates a Firestore instance that you can use to interact with your database
const db: Firestore = getFirestore();

export { db };