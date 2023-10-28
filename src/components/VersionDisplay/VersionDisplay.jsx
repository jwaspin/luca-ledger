import { Typography } from '@mui/material';

import { version } from '../../../package.json';

export default function VersionDisplay() {
  return (
    <Typography
      variant='body2'
      style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
      }}
    >
      {version}
    </Typography>
  );
}