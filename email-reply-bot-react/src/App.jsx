import { useState } from 'react'
import './App.css'
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });

      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data,));
    } catch (error) {
      setError('Failed to generate reply, Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth='lg' sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{mt: 3}}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label='Original Email Content'
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2,}}
        />
        <FormControl fullWidth 
        sx={{ mb: 2,}}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
          value={tone || ''}
          label={"Tone (Optional)"}
          onChange={(e) => setTone(e.target.value)}>
            <MenuItem value='formal'>Formal</MenuItem>
            <MenuItem value='informal'>Informal</MenuItem>
            <MenuItem value='neutral'>Neutral</MenuItem>
            <MenuItem value='friendly'>Friendly</MenuItem>
            <MenuItem value='professional'>Professional</MenuItem>
            <MenuItem value='casual'>Casual</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant='contained'
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>
      </Box>

      {error && (
        <Typography color='error' sx={{mb: 2}}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{mt: 3}}>
          <Typography variant='h6' gutterBottom>
            Generated Reply
          </Typography>
          <TextField
          fullWidth
          multiline
          row={6}
          variant='outlined'
          value={generatedReply || ''}
          sx={{ mb: 2,}}/>
        <Button
          variant='outlined'
          onClick={() => {
            navigator.clipboard.writeText(generatedReply);
          }}
          sx={{mt: 2}}>
            Copy to Clipboard
        </Button>
        </Box>)}

    </Container>
  )
}

export default App
