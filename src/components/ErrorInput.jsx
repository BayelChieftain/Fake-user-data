import React from 'react';

function ErrorInput({ errorAmount, onChange }) {
  return (
    <div className="mb-4">
      <label className="mr-2">Error Amount:</label>
      <input type="range" min="0" max="10" step="1" value={errorAmount} onChange={onChange} className="mr-2" />
      <input type="number" min="0" max="1000" value={errorAmount} onChange={onChange} className="border p-2 rounded" />
    </div>
  );
}

export default ErrorInput;
