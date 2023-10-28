import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export default function CreditCardSettings({ account }) {
    return (
        <Box
          sx={{ width: '30%', padding: '5px', borderRight: '1px solid black' }}
        >
          <Typography
            variant='h4'
            sx={{ textAlign: 'center' }}
          >
            Credit Card Settings
          </Typography>
        </Box>
    );
}

CreditCardSettings.propTypes = {
    account: PropTypes.object.isRequired,
};