import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { closeAccountById } from '../store/actions';

import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

export default function ActionsMenu({ account }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorEl(null);
    setOpen(false);
  };

  const handleCloseAccount = (event) => {
    event.stopPropagation();
    dispatch(closeAccountById(account.id));
    handleClose();
  };

  const handleExportAccount = async (event) => {
    event.stopPropagation();
    // await dispatch(
    //   actions.saveAccountAsync({ account, filename: `${account.name}.json` })
    // );
    console.log('ToDo: Export account data');
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label='more'
        aria-controls='long-menu'
        aria-haspopup='true'
        onClick={handleClick}
        style={{
          height: '35px',
          width: '35px',
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
        sx={{
          '&:hover': {
            backgroundColor: 'darkgray',
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleExportAccount}>
          <ListItemIcon>
            <SaveIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Export Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseAccount}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='inherit'>Close Account</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

ActionsMenu.propTypes = {
  account: PropTypes.object.isRequired,
};
