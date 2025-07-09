import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const suggestionsList = document.getElementById('suggestionsList');

async function loadSuggestions() {
  const querySnapshot = await getDocs(collection(db, 'suggestions'));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement('li');
    li.className = "border p-4 rounded flex justify-between items-center";
    li.innerHTML = `
      <span>${data.text}</span>
      <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        onclick="markResolved('${docSnap.id}')">Mark Resolved</button>`;
    suggestionsList.appendChild(li);
  });
}

window.markResolved = async function (id) {
  const ref = doc(db, 'suggestions', id);
  await updateDoc(ref, { status: 'resolved' });
  alert('✅ Marked as resolved!');
  location.reload();
};

loadSuggestions();
