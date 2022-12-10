// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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
  const analytics = getAnalytics(app);
    async function getMovies(db){
    const movieCol = collection(db, "Movies");
    const movieSnap = await getDocs(movieCol);
    const movieList = movieSnap.docs.map((doc) => doc.data());
    return movieList;
}
const movieList = document.querySelector('#movie-list');
    const form = document.querySelector('#add-movie')

    function renderMovies(dc) {
        let li = document.createElement("li");
        let movie = document.createElement("span");
        let rating = document.createElement("span");
        let cross = document.createElement('div');

        li.setAttribute('data-id', dc.id);
        movie.textContent = dc.data().movie;
        rating.textContent = dc.data().rating;
        cross.textContent = 'x';

        li.appendChild(movie);
        li.appendChild(rating);
        li.appendChild(cross);

        movieList.appendChild(li);

        cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            deleteDoc(doc(db, "movie", id))
        })
    }

    const movie = getDocs(collection(db, "Movies")).then((snapshot) => {
        snapshot.forEach((doc) => {
            renderMovies(doc)
        })
    })

    const q = query(collection(db, "Movies"), where("movie", "==", "rating"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
    })

    const upDoc = doc(db, "Movies", "J9xsnnSRvrwO6KBy1aKd");

    updateDoc(upDoc, {
        name: "Gladiator"
    })

    form.addEventListener(('submit'), (e) => {
        e.preventDefault();
        const docRef = addDoc(collection(db, "Movies"), {
            movie: form.movie.value,
            rating: form.rating.value
        })
    })

    const set = document.querySelector("set");
    set.addEventListener("submit", (event) => {
        event.preventDefault();
        addDoc(collection(db, "docs"), {
            title: set.title.value,
            description: set.description.value,
        }).catch((error) => console.log(error));
        set.title.value = "";
        set.description.value = "";
    });