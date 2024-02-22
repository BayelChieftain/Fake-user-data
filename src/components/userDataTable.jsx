import React from 'react';

function UserDataTable({ data }) {
  const thClasses = 'border border-gray-400 p-2';

  return (
    <table className="mt-4 w-full border-collapse border border-gray-400">
      <thead>
        <tr className="bg-gray-200">
          <th className={thClasses}>Index</th>
          <th className={thClasses}>Random Identifier</th>
          <th className={thClasses}>Name</th>
          <th className={thClasses}>Address</th>
          <th className={thClasses}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, index) => (
          <tr key={index}>
            <td className={thClasses}>{index + 1}</td>
            <td className={thClasses}>{record.uid}</td>
            <td className={thClasses}>{record.fullName}</td>
            <td className={thClasses}>{record.address}</td>
            <td className={thClasses}>{record.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserDataTable;
