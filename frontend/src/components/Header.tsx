import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ marginBottom: 4 }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Contact Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
}