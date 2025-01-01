import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes } from 'react-router-dom';
import { RootState } from './_store';
import { themeSettings } from './_theme';
import './App.css';

function App() {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes></Routes>
        <h1>Vite + React</h1>
      </ThemeProvider>
    </div>
  );
}

export default App;
