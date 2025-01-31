import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';

interface YamlData {
  message: string;
}

function App() {
  const [data, setData] = useState<YamlData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/hello-yaml');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const yamlText = await response.text();
        const yamlData = yaml.load(yamlText) as YamlData;
        setData(yamlData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>YAML Data Viewer</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;