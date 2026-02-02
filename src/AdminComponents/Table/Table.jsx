import React from 'react';
import styles from './Table.module.css'; // make sure this CSS file has the styles you provided

const Table = ({ input ,page,setPage,totalPages}) => {
 
  if (!input || input.length === 0) {
    return <p className="noData">No data available</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableScrool}>
        { (Array.isArray(input) && input.length>0 &&
         ( typeof input[0]=='object' && Object.keys(input[0]).length>0)) ?
        (<table className={styles.table}>
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
        </table>):(
          <p className={styles.noData}>No properties found</p>
        )}
      </div>
       <div className={styles.pagination}>
         {/* Previous Button */}
         { 1 && (
           <button
             onClick={() => setPage(prev => (prev - 1))}
             className={styles.pageBtn}
           >
             Prev
           </button>
         )}
       
         <span className={styles.pageInfo}>
           Page {page} of {totalPages}
         </span>
       
         {/* Next Button */}
         {1 && (
           <button
             onClick={() => setPage(prev =>( prev + 1))}
             className={styles.pageBtn}
           >
             Next
           </button>
         )}
         </div>
    </div>
  );
};

export default Table;
