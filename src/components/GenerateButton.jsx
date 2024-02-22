import React from 'react';

function GenerateButton({ onClick }) {
  const btnClasses = 'transition ease-in-out delay-150 bg-red-300 hover:-translate-y-1 hover:scale-100 hover:bg-red-400 duration-300 bg-red-600 text-white px-4 py-2 rounded mt-3 min-w-36';

  return (
    <button onClick={onClick} className={btnClasses}>Generate</button>
  );
}

export default GenerateButton;
