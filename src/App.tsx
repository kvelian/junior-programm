import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ParticipantsApplicationPopup } from './components/ParticipantApplicationPopup/ParticipantsApplicationPopup';

import type { PopupDataProps } from './components/ParticipantApplicationPopup/ParticipantsApplicationPopup';

import './App.css';
import { SuccessSendApplicationPopup } from './components/SuccessSendApplicationPopup/SuccessSendApplicationPopup';
import { ContactInfo } from './api/instance';

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
  const [viewParticipantsApplicationPopup, setViewParticipantsApplicationPopup] =
    React.useState(false);
  const [popupData, setPopupData] = React.useState<PopupDataProps>({
    participant: {
      person: { lastName: '', firstName: '' },
      contactInfo: {}
    },
    eventSearch: { eventTypes: [], eventThemes: [] }
  });

  const [viewSuccessSendApplicationPopup, setViewSuccessSendApplicationPopup] =
    React.useState(false);

  const closeParticipantsApplicationPopup = () => {
    setViewParticipantsApplicationPopup(false);
  };

  const submitParticipantsApplicationPopup = () => {
    console.log('@@@@@', popupData.eventSearch.event?.sponsor.contactInfo);
    setViewParticipantsApplicationPopup(false);
    setViewSuccessSendApplicationPopup(true);
  };

  const closeSuccessSendApplicationPopup = () => {
    setViewSuccessSendApplicationPopup(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Junior Programm</h1>
        <button onClick={() => setViewParticipantsApplicationPopup(true)}>Подать заявку</button>
      </div>
      {viewParticipantsApplicationPopup && (
        <ParticipantsApplicationPopup
          popupData={popupData}
          updatePopupData={setPopupData}
          onClose={closeParticipantsApplicationPopup}
          onSubmit={submitParticipantsApplicationPopup}
        />
      )}
      {viewSuccessSendApplicationPopup && (
        <SuccessSendApplicationPopup
          onClose={closeSuccessSendApplicationPopup}
          contactInfo={popupData.eventSearch.event?.sponsor.contactInfo}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
