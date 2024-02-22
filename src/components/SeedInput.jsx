import React from 'react';

function SeedInput({ seed, onChange, onRandomClick }) {

    const btnClasses = "transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-100 hover:bg-indigo-500 duration-300 bg-blue-500 text-white px-4 py-2 rounded mt-3 min-w-36";

  return (
    <div className="mb-4">
      <label className="mr-2">Seed:</label>
      <input type="text" value={seed} onChange={onChange} className="border p-2 rounded mr-2" />
      <button onClick={onRandomClick} className={btnClasses}>Random Seed</button>
    </div>
  );
}

export default SeedInput;
