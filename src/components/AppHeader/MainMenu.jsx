import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { selectTransactions } from '../../store/transactionsSlice';

import { Menu as MenuIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const transactions = useSelector(selectTransactions);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoad = () => {
    handleClose();
  };
  const handleSave = () => {
    const saveObject = {
      account: 'test account',
      transactions: transactions.data,
    };
    const saveString = JSON.stringify(saveObject, null, 2);
    const saveBlob = new Blob([saveString]);
    const url = URL.createObjectURL(saveBlob);
    const link = document.createElement('a');
    link.download = 'test.json';
    link.href = url;
    link.append('test.json');
    link.click();
    URL.revokeObjectURL(url);
    handleClose();
  };
  const handleReset = () => {
    handleClose();
  };

  return (
    <>
      <IconButton
        id='main-menu'
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLoad}>Load</MenuItem>
        <MenuItem onClick={handleSave}>Save</MenuItem>
        <MenuItem onClick={handleReset}>Reset</MenuItem>
      </Menu>
    </>
  );
}
