import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (

    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', 
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 1
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {currentYear}
            <Link color="inherit" href="#" sx={{ ml: 0.5, textDecoration: 'none' }}>
              Transcript Analyzer
            </Link>
            . Todos los derechos reservados.
          </Typography>

          <Box>
            <IconButton
              aria-label="GitHub"
              component={Link}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component={Link}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="X (Twitter)"
              component={Link}
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <XIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;