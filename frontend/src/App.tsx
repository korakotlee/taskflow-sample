import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from './config';
import './App.css';

interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await axios.get<HealthResponse>(`${config.apiUrl}/health`);
        setHealth(response.data);
      } catch (err) {
        setError('Failed to connect to backend');
        console.error(err);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TaskFlow</h1>
        {health ? (
          <div>
            <p>✅ Backend connected</p>
            <p>Status: {health.status}</p>
            <p>Version: {health.version}</p>
            <p>Time: {new Date(health.timestamp).toLocaleString()}</p>
          </div>
        ) : error ? (
          <p>❌ {error}</p>
        ) : (
          <p>Connecting to backend...</p>
        )}
      </header>
    </div>
  );
}

export default App;
