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
  Cities,
  EventType,
  EventTheme,
  Participant,
  Event
} from '../../api/instance';
import {
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
  eventId?: Event['id'];
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
  const countryList = [
    { id: 'RUS', name: 'Россия' },
    { id: 'KAZ', name: 'Казахстан' },
    { id: 'BLR', name: 'Белорусь' },
    { id: 'AZE', name: 'Азербайджан' }
  ];
  const ageList = Array.from({ length: 84 }, (_, i) => i + 16);
  const {
    participant: { person, age, address, about },
    eventId
  } = popupData;

  const [cityList, setCityList] = React.useState<Cities[]>([]);
  const [eventTypes, setEventTypes] = React.useState<string[]>([]);
  const [eventTypeList, setEventTypeList] = React.useState<EventType[]>([]);
  const [eventThemes, setEventThemes] = React.useState<string[]>([]);
  const [eventThemeList, setEventThemeList] = React.useState<EventTheme[]>([]);
  const [eventList, setEventList] = React.useState<Event[]>([]);

  React.useEffect(() => {
    getEventsTypes().then((data) => {
      setEventTypeList(data);
    });
    getEventsThemes().then((data) => {
      setEventThemeList(data);
    });
  }, []);

  const changeLastName = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person.lastName = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeFirstName = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person.firstName = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeMiddleName = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person.middleName = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeAbout = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.about = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeAge = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.age = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeCity = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.address.city = event.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeCountry = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.address.countryId = event.target.value;
    if (!event.target.value) {
      setCityList([]);
      return;
    }
    getCities(event.target.value).then((data) => {
      setCityList(data);
    });
  };

  const changeEventTypes = (event: SelectChangeEvent) => {
    const {
      target: { value }
    } = event;
    setEventTypes(typeof value === 'string' ? value.split(',') : value);
  };
  const changeEventThemes = (event: SelectChangeEvent) => {
    const {
      target: { value }
    } = event;
    setEventThemes(typeof value === 'string' ? value.split(',') : value);
  };

  const requestEvents = () => {
    const reqParams: GetEventsParams = {
      typeId: +eventTypes[0],
      themeId: +eventThemes[0],
      city: address.city,
      countryId: address.countryId
    };
    getEvents(reqParams).then((data) => {
      setEventList(data);
    });
  };

  const changeEvent = (event: SelectChangeEvent) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventId = +event.target.value;
    updatePopupData(popupDataUpdated);
  };

  const sendParticipantApplication = () => {
    if (eventId)
      postEventsRequests({ participant: { person, age, address, about }, eventId }).then((data) => {
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
            value={address.countryId}
            onChange={changeCountry}
            itemList={countryList.map((e) => e.name)}
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
            value={address.city}
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
              <MenuItem value={item.city}>{item.city}</MenuItem>
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
            value={eventId}
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
          itemList={ageList}
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
            />
          </FormControl>
          <TextField fullWidth label='Телефон' variant='filled' />
          <TextField fullWidth label='Email' variant='filled' />
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
