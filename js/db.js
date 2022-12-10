// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { initializeFirestore, CACHE_SIZE_UNLIMITED, enableIndexedDBPersistence, onSnapshot, getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD3hABV4dE62_hYC3qiXNyR0mJj1SYx0tE",
    authDomain: "sleepingapp-9c7f4.firebaseapp.com",
    projectId: "sleepingapp-9c7f4",
    storageBucket: "sleepingapp-9c7f4.appspot.com",
    messagingSenderId: "1009942516464",
    appId: "1:1009942516464:web:f5cb97baa6aec99ca52835",
    measurementId: "G-WB4FM6CZ16"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getAnalytics(app);

  async function getPrompts(db) {
    const promptCol = collection(db, "prompts");
    const promptSnap = await getDocs(promptCol);
    const promptList = promptSnap.docs.map((doc) => doc);
    return promptList;
  }
 

enableIndexedDBPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
 
      } else if (err.code == 'unimplemented') {
    }
  });

  const firestoreDb = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
  });
  
  const q = query(collection(db, "cities"), where("state", "==", "CA"));

onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        const source = snapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source);
    });
});

  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    addDoc(collection(db, "prompts"), {
      hours: form.hours.value,
      minutes: form.minutes.value,
      date: form.date.value,
      answer: form.answer.value
    }).catch((error) => console.log(error));
      form.hours.value = "";
      form.minutes.value = "";
      form.date.value = "";
      form.answer.value = "";
    });

    const promptContainer = document.querySelector("prompts");
    promptContainer.addEventListener("click", (e) => {
      if(e.target.tagName === "I") {
        const id = e.target.getAttribute("data-id");
        deleteDoc(doc(db, "prompts", id));
      }
    })