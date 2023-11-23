import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ParticipantsApplicationPopup } from './components/ParticipantApplicationPopup/ParticipantsApplicationPopup';
import './App.css';

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    secondary: {
      main: '#D3D3D3',
      light: '#E9E9E9',
      dark: '#ABABAB',
      contrastText: '#323232'
    },
    primary: {
      main: '#858585',
      light: '#C2C2C2',
      dark: '#666666',
      contrastText: '#FFFFFF'
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontFamily: 'Fira Mono',
      fontSize: 16
    }
  }
});

function App() {
  const [viewPopup, setViewPopup] = useState(false);

  const closePopup = () => {
    console.log(viewPopup, '111');
    setViewPopup(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Junior Programm</h1>
        <button onClick={() => setViewPopup(true)}>Подать заявку</button>
      </div>
      {viewPopup && (
        <ParticipantsApplicationPopup
          onCancel={closePopup}
          onClose={closePopup}
          onSubmit={closePopup}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
