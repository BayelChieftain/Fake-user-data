import React, { useState } from 'react';
import axios from 'axios';
import RegionSelector from './components/RegionSelector';
import ErrorInput from './components/ErrorInput';
import SeedInput from './components/SeedInput';
import GenerateButton from './components/GenerateButton';
import UserDataTable from './components/userDataTable';

function GenerateUser() {
  const [region, setRegion] = useState('USA');
  const [seed, setSeed] = useState('42');
  const [errorAmount, setErrorAmount] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const generate = () => {
    axios.post('https://nodejs-function-express-generate-user-mrzlaou9z.vercel.app', { region, seed, error_amount: errorAmount, page })
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
      <RegionSelector region={region} onChange={handleRegionChange} />
      <ErrorInput errorAmount={errorAmount} onChange={handleSliderChange} />
      <SeedInput seed={seed} onChange={handleSeedChange} onRandomClick={generateRandomSeed} />
      <GenerateButton onClick={generate} />
      <UserDataTable data={data} />
    </div>
  );
}


export default GenerateUser;