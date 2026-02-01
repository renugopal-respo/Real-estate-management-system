import React from 'react';
import './Table.module.css'; // make sure this CSS file has the styles you provided

const Table = ({ input }) => {
  if (!input || input.length === 0) {
    return <p className="noData">No data available</p>;
  }

  return (
    <div className="container">
      <div className="tableScrool">
        <table className="table">
          <thead>
            <tr>
              {Object.keys(input[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {input.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((key) => (
                  <td key={key}>{row[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
