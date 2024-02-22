import React from 'react';

function RegionSelector({ region, onChange }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Select Region:</label>
      <select value={region} onChange={onChange} className="border p-3 rounded">
        <option value="USA">USA</option>
        <option value="France">France</option>
        <option value="Poland">Poland</option>
      </select>
    </div>
  );
}

export default RegionSelector;