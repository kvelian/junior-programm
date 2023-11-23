import * as React from 'react';

import { Popup } from '../common/Popup/Popup';
import { Typography } from '../common/Typography/Typography';
import { Select } from '../common/fields/selects/Select/Select';
import { Close } from '@mui/icons-material';
import {
  Button,
  TextField,
  SelectChangeEvent,
  FilledInput,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton
} from '@mui/material';

import './ParticipantsApplicationPopup.css';

export interface ParticipantsApplicationPopupProps {
  onSubmit: () => void;
  onClose: () => void;
  onCancel: () => void;
}

export const ParticipantsApplicationPopup: React.FC<ParticipantsApplicationPopupProps> = ({
  onSubmit,
  onClose,
  onCancel
}) => {
  const [age, setAge] = React.useState('');
  const changeAge = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const ageList = Array.from({ length: 84 }, (_, i) => i + 16);

  const [country, setCountry] = React.useState('');
  const changeCountry = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };
  const countryList = ['Россия', 'Казахстан', 'Белорусь', 'Азербайджан'];

  const [city, setCity] = React.useState('');
  const changeCity = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };
  const cityList = ['Россия', 'Казахстан', 'Белорусь', 'Азербайджан'];

  const [eventType, setEventType] = React.useState('');
  const changeEventType = (event: SelectChangeEvent) => {
    setEventType(event.target.value);
  };
  const eventTypeList = ['лекция', 'урок', 'сходка', 'квартирник'];

  const [eventTheme, setEventTheme] = React.useState('');
  const changeEventTheme = (event: SelectChangeEvent) => {
    setEventTheme(event.target.value);
  };
  const eventThemeList = ['еда', 'карты', 'свечи', 'растения'];

  const [event, setEvent] = React.useState('');
  const changeEvent = (event: SelectChangeEvent) => {
    setEvent(event.target.value);
  };
  const eventList = [
    'Кулинарный курс лекций',
    'Карточные фокусы',
    'Урок свечеварения',
    'Массовая пересадка замиакулькасов'
  ];

  return (
    <Popup>
      <div className='participantsApplicationPopup-title'>
        <Typography>Подайте заявку на участие</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>
      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Поиск события</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            value={country}
            onChange={changeCountry}
            itemList={countryList}
            id='country'
            label='Страна'
            minWidth={'calc((100% - 10px)/2)'}
          />
          <Select
            value={city}
            onChange={changeCity}
            itemList={cityList}
            id='city'
            label='Город'
            minWidth={'calc((100% - 10px)/2)'}
          />
        </div>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            value={eventType}
            onChange={changeEventType}
            itemList={eventTypeList}
            id='eventType'
            label='Тип события'
            minWidth={'calc((100% - 10px)/2)'}
          />
          <Select
            value={eventTheme}
            onChange={changeEventTheme}
            itemList={eventThemeList}
            id='eventTheme'
            label='Тема события'
            minWidth={'calc((100% - 10px)/2)'}
          />
        </div>
      </div>

      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Событие</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            value={event}
            onChange={changeEvent}
            itemList={eventList}
            id='event'
            label='Событие'
            minWidth={'100%'}
          />
        </div>
      </div>

      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Личная информация</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <TextField fullWidth id='textField-personLastName' label='Фамилия' variant='filled' />
          <TextField fullWidth id='textField-personFirstName' label='Имя' variant='filled' />
          <TextField fullWidth id='textField-personMiddleName' label='Отчество' variant='filled' />
        </div>
        <Select
          value={age}
          onChange={changeAge}
          itemList={ageList}
          minWidth='calc((100% - 20px)/3)'
          id='age'
          label='Возраст'
        />
        <TextField
          fullWidth
          id='textField-multiline-about'
          label='О себе'
          multiline
          maxRows={4}
          variant='filled'
        />
      </div>
      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Контакты</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <FormControl fullWidth variant='filled'>
            <InputLabel htmlFor='textField-contactTelegramm'>Телеграмм</InputLabel>
            <FilledInput
              id='textField-contactTelegramm'
              startAdornment={<InputAdornment position='start'>@</InputAdornment>}
            />
          </FormControl>
          <TextField fullWidth label='Телефон' variant='filled' />
          <TextField fullWidth label='Email' variant='filled' />
        </div>
      </div>
      <div className='participantsApplicationPopup-actionsContainer'>
        <Button id='button-cancel' variant='contained' color='secondary' onClick={onCancel}>
          Отмена
        </Button>
        <Button id='button-submit' variant='contained' color='primary' onClick={onSubmit}>
          Отправить
        </Button>
      </div>
    </Popup>
  );
};
