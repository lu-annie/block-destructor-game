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
  apiKey: "AIzaSyB7eoiAHqJWyBjlrd4tzMWtV_NFUB6ppO0",
  authDomain: "fir-example-68fdc.firebaseapp.com",
  projectId: "fir-example-68fdc",
  storageBucket: "fir-example-68fdc.appspot.com",
  messagingSenderId: "347592329798",
  appId: "1:347592329798:web:d762b27170a1b3e0aa1847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let messages = [];
const messagesRef = collection(db, "messages");

async function sendMessage(message) {
    console.log("Sending a message!");
    // Add some data to the messages collection
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        time: Date.now(),
        content: message,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  window.sendMessage=sendMessage

  async function getAllMessages() {
    messages = [];
  
    const querySnapshot = await getDocs(
      query(messagesRef, orderBy("time", "desc"))
    );
    querySnapshot.forEach((doc) => {
      let msgData = doc.data();
      messages.push(msgData);
    });
  
    console.log(messages);
    render(view(), document.body);
  }
  
  getAllMessages();

function handleInput(e) {
    if (e.key == "Enter") {
        sendMessage(e.target.value);
        e.target.value = "";
      }
}

function view() {
    return html`<h1>my cool app</h1>
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