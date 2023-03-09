// Import the functions you need from the SDKs you need
import { html, render } from "lit-html";
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    orderBy,
  } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCACniYjA-K0jFzc3qQsqnzlURqdL9bqtI",
  authDomain: "block-destructor-game-scores.firebaseapp.com",
  projectId: "block-destructor-game-scores",
  storageBucket: "block-destructor-game-scores.appspot.com",
  messagingSenderId: "383640927796",
  appId: "1:383640927796:web:8e39c36b7ce72d07bf1461",
  measurementId: "G-NZL6GFT0DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messages = [];
const messagesRef = collection(db, "messages");

async function sendScore(username) {
    console.log("Sending your score!");
    // Add some data to the messages collection
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        time: Date.now(),
        username: username,
        score: score,
        levels: levels
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  window.sendScore=sendScore

  async function getAllMessages() {
    messages = [];
  
    const querySnapshot = await getDocs(
      query(messagesRef, orderBy("time", "desc"))
    );
    querySnapshot.forEach((doc) => {
      let msgData = doc.data();
      messages.push(msgData);
    });
  
    //console.log(messages);
    render(view(), document.body);
    return messages
  }
  window.getAllMessages=getAllMessages

function handleInput(e) {
    if (e.key == "Enter") {
        sendScore(e.target.value);
        e.target.value = "";
      }
}

function view() {
  return html`<h1>Score History</h1>
  <input type="text" @keydown=${handleInput} />
  <div id="messages-container">
    ${messages.map((msg) => html`<div class="message">${msg.content}</div>`)}
  </div>`;
}

render(view(), document.body);

onSnapshot(
    collection(db, "messages"),
    (snapshot) => {
      console.log("snap", snapshot);
      getAllMessages();
    },
    (error) => {
      console.error(error);
    }
  );