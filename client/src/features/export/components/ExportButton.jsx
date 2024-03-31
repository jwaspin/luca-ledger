import { Button } from '@mui/material';

export default function ExportButton() {
  const handleExport = () => {
    alert('Exporting data...');
  };

  return (
    <div style={{ position: 'absolute', right: '50px' }}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleExport}
      >
        Export
      </Button>
    </div>
  );
}
