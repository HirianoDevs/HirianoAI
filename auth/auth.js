import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Adicione esta linha:
import { 
    getFirestore, doc, getDoc, setDoc, updateDoc, collection, 
    addDoc, query, orderBy, limit, onSnapshot, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKX2vhPtCg2viA1iBlpmW4VW6K1y3tXzA",
  authDomain: "vilankulos-5dfb1.firebaseapp.com",
  projectId: "vilankulos-5dfb1",
  appId: "1:594610644591:web:afd23c7d677dead9de8f9a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Inicializa o banco de dados

export { 
    auth, db, doc, getDoc, setDoc, updateDoc, 
    collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp 
};


// 🔒 PROTEÇÃO
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login/login.html";
    } else {
        // Colocar dados do usuário no UI
        const avatar = document.querySelector('.user-avatar');
        if (avatar) {
            avatar.innerText = user.displayName
                ? user.displayName.charAt(0).toUpperCase()
                : user.email.charAt(0).toUpperCase();
        }
    }
});

// Logout opcional (se quiser usar depois)
window.logoutUser = async function () {
    await signOut(auth);
    window.location.href = "login/login.html";
};
