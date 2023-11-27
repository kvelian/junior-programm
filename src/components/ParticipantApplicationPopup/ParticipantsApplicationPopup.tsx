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
  IconButton,
  MenuItem,
  Box,
  Chip
} from '@mui/material';

import type {
  GetEventsParams,
  City,
  Country,
  EventType,
  EventTheme,
  Participant,
  Event,
  Person
} from '../../api/instance';
import {
  getCountries,
  getCities,
  getEventsTypes,
  getEventsThemes,
  getEvents,
  postEventsRequests
} from '../../api/instance';

import './ParticipantsApplicationPopup.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export interface PopupDataProps {
  participant: Participant;
  event: {
    eventId?: Event['id'];
    eventTypes?: EventType[];
    eventThemes?: EventTheme[];
    countryId?: Country['id'];
    cityId?: City['id'];
  };
}

export interface ParticipantsApplicationPopupProps {
  popupData: PopupDataProps;
  updatePopupData: (popupData: PopupDataProps) => void;
  onClose: () => void;
}

export const ParticipantsApplicationPopup: React.FC<ParticipantsApplicationPopupProps> = ({
  popupData,
  updatePopupData,
  onClose
}) => {
  const ageList = Array.from({ length: 84 }, (_, i) => i + 16);
  const {
    participant: { person, age, address, about, contactInfo },
    event
  } = popupData;

  const [countryList, setCountryList] = React.useState<Country[]>([]);
  const [cityList, setCityList] = React.useState<City[]>([]);
  const [eventTypes, setEventTypes] = React.useState<string[]>([]);
  const [eventTypeList, setEventTypeList] = React.useState<EventType[]>([]);
  const [eventThemes, setEventThemes] = React.useState<string[]>([]);
  const [eventThemeList, setEventThemeList] = React.useState<EventTheme[]>([]);
  const [eventList, setEventList] = React.useState<Event[]>([]);

  React.useEffect(() => {
    getCountries().then((data) => {
      setCountryList(data);
    });
    getEventsTypes().then((data) => {
      setEventTypeList(data);
    });
    getEventsThemes().then((data) => {
      setEventThemeList(data);
    });

    const { countryId } = event;
    if (!countryId) return;
    getCities(countryId).then((data) => {
      setCityList(data);
    });
  }, []);

  const changeLastName = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person[name as keyof Person] = value;
    updatePopupData(popupDataUpdated);
  };

  const changeFirstName = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person.firstName = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeMiddleName = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person.middleName = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeTelegram = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.contactInfo.telegram = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeEmail = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.contactInfo.email = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changePhone = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.contactInfo.phone = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeAbout = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.about = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeAge = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.age = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeCity = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.event.cityId = +e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeCountry = (e: SelectChangeEvent) => {
    console.log('@');
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.event.countryId = e.target.value;
    console.log(e.target.value);
    if (!e.target.value) {
      setCityList([]);
      return;
    }
    getCities(e.target.value).then((data) => {
      setCityList(data);
    });
  };

  const changeEventTypes = (e: SelectChangeEvent) => {
    const {
      target: { value }
    } = e;
    setEventTypes(typeof value === 'string' ? value.split(',') : value);
  };
  const changeEventThemes = (e: SelectChangeEvent) => {
    const {
      target: { value }
    } = e;
    setEventThemes(typeof value === 'string' ? value.split(',') : value);
  };

  const requestEvents = () => {
    const reqParams: GetEventsParams = {
      typeId: eventTypes.map(Number),
      themeId: eventThemes.map(Number),
      cityId: event.cityId,
      countryId: event.countryId
    };
    getEvents(reqParams).then((data) => {
      setEventList(data);
    });
  };

  const changeEvent = (e: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.event.eventId = +e.target.value;
    updatePopupData(popupDataUpdated);
  };

  const sendParticipantApplication = () => {
    if (event.eventId)
      postEventsRequests({
        participant: { person, age, address, about, contactInfo },
        eventId: event.eventId
      }).then((data) => {
        console.log(data);
      });
    onClose();
  };

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
            value={event.countryId}
            onChange={changeCountry}
            id='country'
            label='Страна'
            minWidth={'calc((100% - 10px)/2)'}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {countryList.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <Select
            value={event.cityId}
            onChange={changeCity}
            id='city'
            label='Город'
            minWidth={'calc((100% - 10px)/2)'}
            disabled={!cityList.length}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {cityList.map((item) => (
              <MenuItem value={item.id}>{item.city}</MenuItem>
            ))}
          </Select>
        </div>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            value={eventTypes}
            onChange={changeEventTypes}
            itemList={eventTypeList}
            id='eventType'
            label='Тип события'
            minWidth={'calc((100% - 10px)/2)'}
            multiple
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {eventTypeList.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <Select
            value={eventThemes}
            onChange={changeEventThemes}
            id='eventTheme'
            label='Тема события'
            minWidth={'calc((100% - 10px)/2)'}
            multiple
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {eventThemeList.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Событие</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            required
            value={event.eventId}
            onChange={changeEvent}
            onOpen={requestEvents}
            id='event'
            label='Событие'
            minWidth={'100%'}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {eventList.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Личная информация</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <TextField
            name='lastName'
            required
            fullWidth
            id='textField-personLastName'
            label='Фамилия'
            variant='filled'
            value={person.lastName}
            onChange={changeLastName}
          />
          <TextField
            required
            fullWidth
            id='textField-personFirstName'
            label='Имя'
            variant='filled'
            value={person.firstName}
            onChange={changeFirstName}
          />
          <TextField
            fullWidth
            id='textField-personMiddleName'
            label='Отчество'
            variant='filled'
            value={person.middleName}
            onChange={changeMiddleName}
          />
        </div>
        <Select
          value={age}
          onChange={changeAge}
          minWidth='calc((100% - 20px)/3)'
          id='age'
          label='Возраст'
          MenuProps={MenuProps}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {ageList.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          id='textField-multiline-about'
          label='О себе'
          multiline
          maxRows={4}
          variant='filled'
          value={about}
          onChange={changeAbout}
        />
      </div>
      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Контакты *</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <FormControl fullWidth variant='filled'>
            <InputLabel htmlFor='textField-contactTelegramm'>Телеграмм</InputLabel>
            <FilledInput
              id='textField-contactTelegramm'
              startAdornment={<InputAdornment position='start'>@</InputAdornment>}
              value={contactInfo.telegram}
              onChange={changeTelegram}
            />
          </FormControl>
          <TextField
            fullWidth
            label='Телефон'
            variant='filled'
            value={contactInfo.phone}
            onChange={changePhone}
          />
          <TextField
            fullWidth
            label='Email'
            variant='filled'
            value={contactInfo.email}
            onChange={changeEmail}
          />
        </div>
      </div>
      <div className='participantsApplicationPopup-actionsContainer'>
        <Button id='button-cancel' variant='contained' color='secondary' onClick={onClose}>
          Отмена
        </Button>
        <Button
          id='button-submit'
          variant='contained'
          color='primary'
          onClick={sendParticipantApplication}
        >
          Отправить
        </Button>
      </div>
    </Popup>
  );
};
