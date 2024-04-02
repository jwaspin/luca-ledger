// import { useState } from 'react';

export default function ImportPage() {
  //   const [importData, setImportData] = useState(null);
  //   const [importStatus, setImportStatus] = useState(null);

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImportData(e.target.result);
  //     };
  //     reader.readAsText(file);
  //   };

  //   const handleImport = async () => {
  //     console.log('Importing...');
  //     // try {
  //     //   setImportStatus('loading');
  //     //   await importTransactions(importData);
  //     //   setImportStatus('success');
  //     // } catch (error) {
  //     //   setImportStatus('error');
  //     // }
  //   };

  return (
    <div>
      <h1>Import Transactions</h1>
      {/* <input
        type='file'
        onChange={handleFileChange}
      />
      <button onClick={handleImport}>Import</button>
      {importStatus === 'loading' && <p>Loading...</p>}
      {importStatus === 'success' && <p>Import successful</p>}
      {importStatus === 'error' && <p>Import failed</p>} */}
    </div>
  );
}
