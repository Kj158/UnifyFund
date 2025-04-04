import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const fundButton = document.getElementById("fund");
  const exploreButton = document.getElementById("explore");

  const feedbackForm = document.getElementById("feedbackform");
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", submitFeedback);
    } else {
        console.error("Feedback form not found!");
    }

  
  if (fundButton) {
    fundButton.addEventListener("click", () => {
      console.log("Fund button clicked");
      window.location.href = "admin.html";
    });
  } else {
    console.error("Fund button not found!");
  }

  if (exploreButton) {
    exploreButton.addEventListener("click", () => {
      console.log("Explore button clicked");
      window.location.href = "new.html";
    });
  } else {
    console.error("Explore button not found!");
  }
});
  
  const firebaseConfig = {
    apiKey: "AIzaSyBnYkstP4DDEP284hk6-DtUZcF0mCgqX-s",
    authDomain: "unify-fund-auth.firebaseapp.com",
    databaseURL: "https://unify-fund-auth-default-rtdb.firebaseio.com",
    projectId: "unify-fund-auth",
    storageBucket: "unify-fund-auth.appspot.com",
    messagingSenderId: "820691499618",
    appId: "1:820691499618:web:ca9be8b5e9044ba5602f3b",
    measurementId: "G-CMVFS16R2B"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  

  const signoutButton = document.getElementById("signout");
 


  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user.email);
      if (signoutButton) {signoutButton.style.display = "block";
        signoutButton.textContent="Sign Out";
      }
    } else {
      console.log("No user is signed in.");
      if (signoutButton){ 
        signoutButton.style.display = "block";
        signoutButton.textContent="Sign In";
      }
    }
  });

  
  signoutButton?.addEventListener("click", async () => {
    if(auth.currentUser){
      try {
        await signOut(auth);
        sessionStorage.removeItem("user-creds");
        sessionStorage.removeItem("user-info");
        alert("Signed out successfully!");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error signing out:", error.message);
        alert(`Error signing out: ${error.message}`);
      }
    }else{
      window.location.href="login.html";
    }
    
  });
  document.querySelector(".burger").addEventListener("click", function() {
    document.querySelector(".list").classList.toggle("show");
  });
  


  
  
  async function submitFeedback(e) {
    e.preventDefault();

  
    const feedbackForm = document.querySelector("form#feedbackform");
    
    if (!feedbackForm) {
        console.error("Feedback form not found!");
        alert("Error: Feedback form does not exist.");
        return;
    }

    const formData = new FormData(feedbackForm); 

    try {
        const response = await fetch("https://formspree.io/f/xyzglpnl", { 
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        const result = await response.json();
        if (result.ok) {
            alert("Feedback submitted successfully!");
            feedbackForm.reset();

        } else {
            throw new Error("Error submitting feedback.");
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to submit feedback. Try again.");
    }
}





  