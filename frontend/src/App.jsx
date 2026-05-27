import { useState } from 'react';
import axios from 'axios';

function App() {
  const [preference, setPreference] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Point this to your backend URL (localhost or Render)
      const response = await axios.post('http://localhost:3000/recommend', { preference });
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Movie Recommender 
          </span> 🍿
        </h1>
        <p className="text-slate-400 text-lg">
          Tell us what you're in the mood for, and our AI will find the perfect films.
        </p>
      </div>

      {/* Search Form */}
      <div className="max-w-2xl mx-auto mb-16">
        <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder='e.g., "Action movies with a strong female lead"'
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            required
            className="flex-1 w-full px-6 py-4 rounded-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner text-lg"
          />
          <button 
            type="submit" 
            disabled={loading}
            className={`px-8 py-4 rounded-full font-semibold text-white transition-all transform ${
              loading 
                ? 'bg-slate-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 active:translate-y-0'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : 'Discover'}
          </button>
        </form>
        {error && <p className="text-red-400 text-center mt-4 bg-red-400/10 py-2 rounded-lg">{error}</p>}
      </div>

      {/* Movie Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <div 
              key={index} 
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/50 transition-all duration-300 group flex flex-col"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-purple-400 transition-colors">
                {movie.title}
              </h2>
              <p className="text-slate-400 leading-relaxed flex-1">
                {movie.description}
              </p>
            </div>
          ))}
        </div>
        
        {movies.length === 0 && !loading && !error && (
          <div className="text-center text-slate-500 mt-20">
            <p className="text-xl">Waiting for your movie craving...</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;