import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [nonFollowers, setNonFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNonFollowers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/nonfollowers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      setNonFollowers(data.nonFollowers);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNonFollowers();
  };

  return (
    <div>
      <h1>Instagram Non-Follower Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>Find Non-Followers</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul>
        {nonFollowers.map((nonFollower, index) => (
          <li key={index}>{nonFollower}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
