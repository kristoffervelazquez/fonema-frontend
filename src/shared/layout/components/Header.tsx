import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';


import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SummarizeIcon from '@mui/icons-material/Summarize'; 
const links = [
  { label: "Inicio", route: "/", icon: <HomeIcon /> },
  { label: "Historial", route: "/history", icon: <HistoryIcon /> },
  { label: "Ayuda", route: "mailto:help@transcript.com", icon: <HelpOutlineIcon /> },
];

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };


  const drawerMenu = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {links.map((link) => (
          <ListItem key={link.label} disablePadding>
            <ListItemButton component={RouterLink} to={link.route}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>

      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <IconButton component={RouterLink} to="/" color="primary" edge="start" aria-label="home">
              <SummarizeIcon />
            </IconButton>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ color: 'primary.main', textDecoration: 'none', ml: 1 }}
            >
              Transcript Analyzer
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {links.map((link) => (
              <Button
                key={link.label}
                component={RouterLink}
                to={link.route}
                color="inherit"
                sx={{ color: 'text.primary', textTransform: 'none', fontSize: '1rem' }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawerMenu}
      </Drawer>
    </>
  );
};

export default Header;