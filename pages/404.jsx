import { Box, Typography, Button, Container } from '@mui/material';

export default function Custom404() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      px: 4,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'monospace',
      backgroundColor: '#0a0a0a'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url(https://images.unsplash.com/photo-1579762593217-46655e4e7efc?q=80&w=1217&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) no-repeat center center',
        backgroundSize: 'cover'
      }} />
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.55)'
      }} />
      <Container maxWidth="lg" sx={{
        maxWidth: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <Box sx={{
          mb: 4
        }}>
          <Typography variant="h1" sx={{
            fontSize: '9rem',
            fontWeight: 300,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            color: '#ffffff'
          }}>
            404
          </Typography>
          <Box sx={{
            mt: 2
          }}>
            <Typography variant="h3" sx={{
              fontSize: '1.5rem',
              fontWeight: 500,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}>
              Lost in space?
            </Typography>
            <Typography variant="body1" sx={{
              mt: 1,
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}>
              The page you're looking for seems to have drifted away.
            </Typography>
            <Typography variant="body2" sx={{
              mt: 1,
              fontSize: '0.875rem',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              color: '#ffffff'
            }}>
              Don't worry, you can always navigate back home.
            </Typography>
          </Box>
        </Box>
        <Button href="/" sx={{
          px: 4,
          py: 1.5,
          fontSize: '0.875rem',
          fontWeight: 500,
          borderRadius: '0.5rem',
          border: '1px solid #ffffff',
          backgroundColor: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderColor: '#ffffff'
          }
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Button>
      </Container>
    </Box>
  );
}