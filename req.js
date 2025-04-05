import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

import crypto from 'crypto';
const auth = getAuth();

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken(true);
    console.log("User Token:", token);
  } else {
    console.error("User not logged in.");
    alert("You must log in to proceed.");
  }
});

async function createCrowdfundRequest(data) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("You must be logged in to create a fund request.");
    return;
  }

  const token = await user.getIdToken(); 
  // const compositeKey = `${data.country}_${data.accountNumber}`;
  const compositeKey = crypto.randomUUID(); 

  const url = `https://firestore.googleapis.com/v1/projects/unify-fund-auth/databases/(default)/documents/fundRequests`;
  try{
    
  const response = await fetch(url, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fields: {
          compositeKey: { stringValue: compositeKey },
            country: { stringValue: data.country },
            category: { stringValue: data.category },
            amount: { integerValue: parseInt(data.amount) },
            cause: { stringValue: data.cause },
            bankName: { stringValue: data.bankName },
            accountNumber: { stringValue: data.accountNumber }
        }
    })
});

if (!response.ok) {
    const errorResult = await response.json();
    console.error("Failed to create crowdfund request:", errorResult);
    alert("Error creating fund request: " + (errorResult.error?.message || "Unknown error"));
    return;
}


const result = await response.json();
console.log("Crowdfund request created successfully:", result);
}

catch (error) {
  console.error("Error creating fund request:", error.message);
  alert("Error creating fund request: " + error.message);
}
}
