import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movies, setMovies] = useState([]);
  const [updateTitle, setUpdateTitle] = useState("");
  const [fileUpload, setFileUplaod] = useState(null);

  //New movie state
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDate, setMovieDate] = useState("");
  const [isOscar, setIsOscar] = useState(false);

  const movieCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(movieCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovies(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: movieTitle,
        releaseDate: movieDate,
        recievedAnOscar: isOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const handleEdit = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
    getMovieList();
  };
  const handleUpload = async () => {
    if (!fileUpload) return;
    const fileFolderREF = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
    await uploadBytes(fileFolderREF, fileUpload)
      
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="App">
      <Auth />
      <div>
        <input
          placeholder="name"
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <input
          placeholder="number"
          type="number"
          onChange={(e) => setMovieDate(e.target.value)}
        />
        <input type="checkbox" onClick={(e) => setIsOscar(e.target.checked)} />
        <label>Is Oscar</label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {movies.map((movie) => (
          <div>
            <h1
              style={{
                color: movie.recievedAnOscar ? "green" : "rebeccapurple",
              }}
            >
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>
            <div>
              <input
                placeholder="update title"
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <button onClick={() => handleEdit(movie.id)}>Update</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUplaod(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default App;
