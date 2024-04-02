import { Box, Button } from '@mui/material';
import { useRef } from 'react';
// import { useDispatch } from 'react-redux';

export default function LoadButton() {
  //   const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result);
      console.log(json);
    };
    reader.readAsText(file);
  };

  const handleImportDataClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Button
        variant='contained'
        color='primary'
        onClick={handleImportDataClick}
      >
        Import Data
      </Button>
      <input
        type='file'
        id='fileInput'
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: 'none' }}
        multiple
      />
    </Box>
  );
}
