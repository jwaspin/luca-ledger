import { IconButton, ListItemButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  loadTransactions,
  resetTransactions,
} from '../../store/transactionsSlice';
import SaveModal from './SaveModal';

import { Menu as MenuIcon } from '@mui/icons-material';

export default function MainMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoad = async () => {
    dispatch(loadTransactions());
    handleClose();
  };

  const handleReset = () => {
    dispatch(resetTransactions());
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
        <MenuItem onClick={handleLoad}>
          <ListItemButton>Load</ListItemButton>
        </MenuItem>
        <MenuItem>
          <SaveModal closeCb={handleClose} />
        </MenuItem>
        <MenuItem onClick={handleReset}>
          <ListItemButton>Reset</ListItemButton>
        </MenuItem>
      </Menu>
    </>
  );
}
