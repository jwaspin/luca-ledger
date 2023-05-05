import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MainMenu from './MainMenu';

export default function AppHeader() {
  return (
    <AppBar position='static'>
      <Toolbar>
        <MainMenu />
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Financial Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
