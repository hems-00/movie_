import React,{ useEffect,useState } from 'react';
import { useDebounce } from 'react-use';
import './App.css';
import './index.css';
import Search from './components/search';
import MovieCard from './components/MovieCard';
import { trendingmovie,updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method : 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function PosterFan() {
  return (
    <div className="relative flex justify-center items-center mt-16">
      {/* Poster 1 - Left Tilt */}
      <img
        src="./alien.jpg"
        alt="Poster 1"
        className="w-35 h-55 object-cover absolute transform -rotate-12 -translate-x-32 z-
                    10 shadow rounded brightness-90 
                    hover:scale-105 transition-transform duration-300 ease-in-out"
      />

      {/* Poster 2 - Center */}
      <img
        src="./bad.jpg"
        alt="Poster 2"
        className="w-44 h-64 object-cover z-20 shadow-xl rounded
                    hover:scale-107 transition-transform duration-300 ease-in-out"
      />

      {/* Poster 3 - Right Tilt */}
      <img
        src="./draw.jpg"
        alt="Poster 3"
        className="w-35 h-55 object-cover absolute transform rotate-12 
                    translate-x-32 z-10 shadow-lg rounded
                    hover:scale-105 transition-transform duration-300 ease-in-out
 "
      />
    </div>
  );
}

function PexelsLoader() {
  return (
    <div className="absolute bottom left-0 w-full z-50 pointer-events-none">
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 w-3 h-3 bg-white rounded-full"
          style={{
            animation: "slide-across 1.8s ease-in-out infinite",
            animationDelay: `${i * 0.25}s`,
          }}
        ></span>
      ))}
    </div>
  );
}



function App() {

  const [searchterm,setsearchterm] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [movielist, setmovielist] = useState([]);
  const [loading, setloading] = useState(false);
  const [debouncesearchterm,setdebouncesearchterm] = useState("");
  const [trending,settrending] = useState([]);

  useDebounce(()=>setdebouncesearchterm(searchterm),600,[searchterm])
  const fetchMovies = async (query ='') => {
    setloading(true);
    setErrorMessage("");

    try{
      const endpoint = query ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      // console.log(data);

      if (data.Response ==='False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setmovielist([]);
        return;
      }

      setmovielist(data.results || []);

      if(query && data.results.length > 0){
        await updateSearchCount(query,data.results[0])
      }

    } catch(error){
      console.error(`Error in fetch ${error}`);
      setErrorMessage('Errror fetching movies...');
    }
    finally{
      setloading(false);
    }
  };

  const loadTrendingMov = async () =>{
    try{
      const movies = await trendingmovie();
      settrending(movies);

    }
    catch(error){
      console.error("error fetching movies..");
    }
  }

  console.log(trending);
  useEffect(()=>{
    fetchMovies(debouncesearchterm);
  },[debouncesearchterm]);

  useEffect(()=>{
    loadTrendingMov();
  },[]);

  return (
  <main className="overflow-hidden font-sans">

  {/* HERO SECTION */}
  <section
    className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4 rounded-b-4xl"

    style={{ backgroundImage: "url('./space.jpeg')" }}
  >
    <div className="z-10">
      <PosterFan />

      <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
        FIND ALL THE BEST
        <span className="text-gradient2"> songs </span> + 
        <span className="text-gradient1"> movies</span> of ALL TIME
      </h1>

      <div className="max-w-lg mx-auto w-full">
        <Search searchterm={searchterm} setsearchterm={setsearchterm} />
      </div>
    </div>
  </section>
  <div className = "px-10">
    <section className = "trending">
      <h1 className = "text-2xl relative left-5">
        trending
      </h1>
      <ul className="trending">
        {trending.map((movie, index) => (
          <li key={movie.$id}>
            <p>{index+1}</p>
              <img src = {movie.poster_url} alt={movie.title}/>
          </li>
        ))}
      </ul>
    </section>


  {/* MOVIE LIST SECTION (dark like Pexels image grid) */}
    <h2 className="text-lg font-mono font-bold text-left mb-6">ALL MOVIES</h2>

    {loading ? (
      <PexelsLoader/>
    ) : errorMessage ? (
      <p className="text-red-500">{errorMessage}</p>
    ) : (
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movielist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    )}
    </div>
</main>
);

}
export default App


