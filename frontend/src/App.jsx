import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://movie-recommender-api-89u3.onrender.com'; 

function App() {
  const [preference, setPreference] = useState('');
  const [movies, setMovies] = useState([]);
  const [history, setHistory] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('search'); // 'search' or 'history'

  // Fetch New Recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setView('search');

    try {
      const response = await axios.post(`${API_BASE_URL}/recommend`, { preference });
      setMovies(response.data);
    } catch (err) {
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Database History
  const fetchHistory = async () => {
    setLoadingHistory(true);
    setError(null);
    setView('history');

    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (err) {
      setError('Failed to fetch history. Is your backend route live?');
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            AI Movie Recommender 
          </span> 🍿
        </h1>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => setView('search')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${view === 'search' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            Find Movies
          </button>
          <button 
            onClick={fetchHistory}
            className={`px-6 py-2 rounded-full font-medium transition-all ${view === 'history' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {loadingHistory ? 'Loading...' : 'View Database History'}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-center max-w-2xl mx-auto mb-8 bg-red-400/10 py-2 rounded-lg">{error}</p>}

      {/* --- SEARCH VIEW --- */}
      {view === 'search' && (
        <div className="max-w-2xl mx-auto mb-16 animate-fade-in">
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
              className={`px-8 py-4 rounded-full font-semibold text-white transition-all ${
                loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {loading ? 'Searching...' : 'Discover'}
            </button>
          </form>

          {/* Current Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 mt-12 gap-6">
            {movies.map((movie, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold text-slate-100 mb-2 text-purple-400">{movie.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{movie.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- HISTORY VIEW --- */}
      {view === 'history' && (
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-slate-200">Past Recommendations</h2>
          
          {history.length === 0 && !loadingHistory ? (
             <p className="text-slate-500 text-center mt-10">No history found. Try searching for some movies first!</p>
          ) : (
            <div className="flex flex-col gap-6">
              {history.map((item) => {
                // The database stores the movies as a JSON string, so we need to parse it back into an array
                const recommendedList = JSON.parse(item.recommended_movies || "[]");
                
                return (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                      <p className="text-lg font-semibold text-indigo-400">
                        Prompt: "{item.user_input}"
                      </p>
                      <span className="text-xs text-slate-500 bg-slate-950 px-3 py-1 rounded-full">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.isArray(recommendedList) && recommendedList.map((movie, i) => (
                        <div key={i} className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                          <h3 className="font-bold text-slate-200 mb-1">{movie.title}</h3>
                          <p className="text-xs text-slate-400">{movie.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;