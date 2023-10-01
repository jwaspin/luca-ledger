import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

import AccountNameEdit from './AccountNameEdit';

export default function AccountNameDisplay({ account }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {isEditing ? (
        <AccountNameEdit
          account={account}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Typography
          variant='h3'
          onClick={handleNameClick}
          style={{
            cursor: 'pointer',
          }}
        >
          {account.name}
        </Typography>
      )}
    </>
  );
}

AccountNameDisplay.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
