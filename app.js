import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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

const form = document.getElementById('suggestionForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('suggestionInput');
  const suggestion = input.value.trim();

  if (suggestion) {
    await addDoc(collection(db, 'suggestions'), {
      text: suggestion,
      timestamp: Date.now(),
      status: 'pending'
    });
    document.getElementById('successMsg').classList.remove('hidden');
    input.value = '';
  }
});
