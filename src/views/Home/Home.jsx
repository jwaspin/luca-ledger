import { Box, Typography } from '@mui/material';

import config from '@/config';

export default function Home() {
  return (
    <Box>
      <Box
        style={{
          borderBottom: '3px solid black',
          padding: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h2'
          style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}
        >
          Welcome to Luca Ledger
        </Typography>
        <Typography>
          COMING SOON!!! Version 2.0! Stay tuned for updates!
          <p>Version 2 will see a major update to the schemas for how the data is being stored. This will allow more front end features to be developed making this application even more powerful!</p>
          <p><em>New Domain!</em> Version 2 will also probably see changes to the domain, but, if anyone is actually using this application, I am interested in your feedback regarding the name and domain of this application. I am planning on making this into a more official open source project hopefully to attract more interest and user support. I have created <a href="https://github.com/jwaspin/luca-ledger/issues/160">this issue on GitHub</a> to try and capture some discussion around this topic. Please contribute if you're interested! It would be good to know if I actually have any active users for this application yet, especially to communicate these coming changes more effectively.</p>
        </Typography>
        <Typography
          variant='body1'
          style={{ width: '75%', textAlign: 'justify', marginBottom: '50px' }}
        >
          {config.homeText}
        </Typography>
        <Typography
          variant='body1'
          style={{ width: '75%', textAlign: 'justify' }}
        >
          {config.lucaBio}
        </Typography>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='subtitle2'
          width='50%'
        >
          {config.legalDisclaimer}
        </Typography>
      </Box>
    </Box>
  );
}
