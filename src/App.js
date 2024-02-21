import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [region, setRegion] = useState('USA');
  const [seed, setSeed] = useState('42');
  const [errorAmount, setErrorAmount] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const generate = () => {
    axios.post('http://localhost:5000/generate', { region, seed, error_amount: errorAmount, page })
      .then(response => {
        setData([...data, ...response.data]);
        setPage(page + 1);
      })
      .catch(error => console.error(error));
  };

  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000).toString();
    setSeed(randomSeed);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setPage(1);
  };

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
    setPage(1);
  };

  const handleSliderChange = (e) => {
    setErrorAmount(parseInt(e.target.value, 10));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="mr-2">Select Region:</label>
        <select value={region} onChange={handleRegionChange} className="border p-2 rounded">
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Poland">Poland</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">Error Amount:</label>
        <input type="range" min="0" max="10" step="1" value={errorAmount} onChange={handleSliderChange} className="mr-2" />
        <input type="number" min="0" max="1000" value={errorAmount} onChange={handleSliderChange} className="border p-2 rounded" />
      </div>

      <div className="mb-4">
        <label className="mr-2">Seed:</label>
        <input type="text" value={seed} onChange={handleSeedChange} className="border p-2 rounded mr-2" />
        <button onClick={generateRandomSeed} className="bg-blue-500 text-white px-4 py-2 rounded">Random Seed</button>
      </div>

      <button onClick={generate} className="bg-green-500 text-white px-4 py-2 rounded">Generate</button>

      <table className="mt-4 w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Index</th>
            <th className="border border-gray-400 p-2">Random Identifier</th>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Address</th>
            <th className="border border-gray-400 p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{index + 1}</td>
              <td className="border border-gray-400 p-2">{record.uid}</td>
              <td className="border border-gray-400 p-2">{record.fullName}</td>
              <td className="border border-gray-400 p-2">{record.address}</td>
              <td className="border border-gray-400 p-2">{record.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;

