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
  Chip,
  Autocomplete
} from '@mui/material';

import type {
  GetEventsParams,
  City,
  Country,
  EventType,
  EventTheme,
  Participant,
  Event,
  Person,
  ContactInfo
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
  eventSearch: {
    event?: Event;
    eventTypes: string[];
    eventThemes: string[];
    country?: Country;
    city: City;
  };
}

export interface ParticipantsApplicationPopupProps {
  popupData: PopupDataProps;
  updatePopupData: (popupData: PopupDataProps) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const initialPopupDataProps = {
  participant: {
    person: { lastName: '', firstName: '' },
    contactInfo: {}
  },
  eventSearch: { eventTypes: [], eventThemes: [], city: { id: 0, city: '', region: '' } }
};

export const ParticipantsApplicationPopup: React.FC<ParticipantsApplicationPopupProps> = ({
  popupData,
  updatePopupData,
  onClose,
  onSubmit
}) => {
  const ageList = Array.from({ length: 84 }, (_, i) => i + 16);
  const {
    participant: { person, age, address, about, contactInfo },
    eventSearch
  } = popupData;

  const [countryList, setCountryList] = React.useState<Country[]>([]);
  const [cityList, setCityList] = React.useState<City[]>([]);
  const [eventTypeList, setEventTypeList] = React.useState<EventType[]>([]);
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

    const { country } = eventSearch;
    if (country?.id)
      getCities(country.id).then((data) => {
        setCityList(data);
      });
    if (eventSearch.event?.id) requestEvents();
  }, []);

  const handlerChangePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.person[name as keyof Person] = value;
    updatePopupData(popupDataUpdated);
  };

  const handlerChangeContactInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.contactInfo[name as keyof ContactInfo] = value;
    updatePopupData(popupDataUpdated);
  };

  const changeAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.about = e.target.value;
    updatePopupData(popupDataUpdated);
  };
  const changeAge = (e: SelectChangeEvent<number>) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.participant.age = e.target.value ? +e.target.value : undefined;
    updatePopupData(popupDataUpdated);
  };

  const changeCity = (city: City) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.city = city;
    updatePopupData(popupDataUpdated);
  };

  const changeCountry = (country?: Country) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.country = country;
    popupDataUpdated.eventSearch.city = { id: 0, city: '', region: '' };
    updatePopupData(popupDataUpdated);
    if (!country) {
      setCityList([]);
      return;
    }
    getCities(country.id).then((data) => {
      setCityList(data);
    });
  };

  const deleteEventTypesItem = (eventTypeId: string) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.eventTypes = eventSearch.eventTypes.filter(
      (chip) => chip !== eventTypeId
    );
    updatePopupData(popupDataUpdated);
  };

  const changeEventTypes = (e: SelectChangeEvent) => {
    const {
      target: { value }
    } = e;
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.eventTypes = typeof value === 'string' ? value.split(',') : value;
    updatePopupData(popupDataUpdated);
  };

  const deleteEventThemeItem = (eventThemeId: string) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.eventThemes = eventSearch.eventThemes.filter(
      (chip) => chip !== eventThemeId
    );
    updatePopupData(popupDataUpdated);
  };

  const changeEventThemes = (e: SelectChangeEvent) => {
    const {
      target: { value }
    } = e;
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.eventThemes = typeof value === 'string' ? value.split(',') : value;
    updatePopupData(popupDataUpdated);
  };

  const changeEvent = (e: SelectChangeEvent<Event[]>) => {
    const popupDataUpdated = { ...popupData };
    popupDataUpdated.eventSearch.event = eventList.find((chip) => chip.id === +e.target.value);
    updatePopupData(popupDataUpdated);
  };

  const requestEvents = () => {
    const reqParams: GetEventsParams = {
      ...(eventSearch.eventTypes && { typeId: eventSearch.eventTypes.map(Number) }),
      ...(eventSearch.eventThemes && { themeId: eventSearch.eventThemes.map(Number) }),
      ...(eventSearch.city.id && { cityId: eventSearch.city?.id }),
      ...(eventSearch.country?.id && { countryId: eventSearch.country?.id })
    };
    getEvents(reqParams).then((data) => {
      setEventList(data);
    });
  };

  const sendParticipantApplication = () => {
    const userAddress = { ...address };
    if (eventSearch.city.id) userAddress.cityId = eventSearch.city.id;
    if (eventSearch.country?.id) userAddress.countryId = eventSearch.country.id;
    if (eventSearch.event?.id)
      postEventsRequests({
        participant: {
          person,
          age,
          ...((userAddress.cityId || userAddress.countryId) && { address: userAddress }),
          about,
          contactInfo
        },
        eventId: eventSearch.event.id
      }).then(() => {
        onSubmit();
      });
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
          <Autocomplete
            value={eventSearch.country}
            onChange={(_event, newInputValue) => {
              changeCountry(newInputValue);
            }}
            id='country'
            sx={{ minWidth: 'calc((100% - 10px)/2)' }}
            options={countryList}
            getOptionLabel={(option) => (option.name ? option.name : '')}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Страна'
                variant='filled'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            )}
          ></Autocomplete>
          <Autocomplete
            value={eventSearch.city}
            onChange={(_event, newInputValue) => {
              changeCity(newInputValue);
            }}
            id='city'
            sx={{ minWidth: 'calc((100% - 10px)/2)' }}
            disabled={!cityList.length}
            options={cityList}
            getOptionLabel={(option) => (option.city ? option.city : '')}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Город'
                variant='filled'
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.id} value={option.id}>
                {option.city}
              </MenuItem>
            )}
          ></Autocomplete>
        </div>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            value={eventSearch.eventTypes}
            onChange={changeEventTypes}
            id='eventType'
            label='Тип события'
            minWidth={'calc((100% - 10px)/2)'}
            multiple
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={eventTypeList.find((e) => e.id === value)?.name}
                    onDelete={() => deleteEventTypesItem(value)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                ))}
              </Box>
            )}
          >
            {eventTypeList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={eventSearch.eventThemes}
            onChange={changeEventThemes}
            id='eventTheme'
            label='Тема события'
            minWidth={'calc((100% - 10px)/2)'}
            multiple
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={eventThemeList.find((e) => e.id === value)?.name}
                    onDelete={() => deleteEventThemeItem(value)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                  />
                ))}
              </Box>
            )}
          >
            {eventThemeList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className='participantsApplicationPopup-body'>
        <Typography variant='title-2'>Событие</Typography>
        <div className='participantsApplicationPopup-fieldsContainer'>
          <Select
            required
            value={eventSearch.event?.id}
            onChange={changeEvent}
            onOpen={requestEvents}
            id='event'
            label='Событие'
            minWidth={'100%'}
          >
            <MenuItem key='event-none' value=''>
              <em>None</em>
            </MenuItem>
            {eventList.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
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
            name='lastName'
            value={person.lastName}
            onChange={handlerChangePerson}
          />
          <TextField
            required
            fullWidth
            name='firstName'
            id='textField-personFirstName'
            label='Имя'
            variant='filled'
            value={person.firstName}
            onChange={handlerChangePerson}
          />
          <TextField
            fullWidth
            name='middleName'
            id='textField-personMiddleName'
            label='Отчество'
            variant='filled'
            value={person.middleName ? person.middleName : ''}
            onChange={handlerChangePerson}
          />
        </div>
        <Select
          value={age}
          name='age'
          onChange={changeAge}
          minWidth='calc((100% - 20px)/3)'
          id='age'
          label='Возраст'
          MenuProps={MenuProps}
        >
          <MenuItem key='age-none' value=''>
            <em>None</em>
          </MenuItem>
          {ageList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          name='about'
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
              name='telegram'
              id='textField-contactTelegramm'
              startAdornment={<InputAdornment position='start'>@</InputAdornment>}
              value={contactInfo.telegram}
              onChange={handlerChangeContactInfo}
            />
          </FormControl>
          <TextField
            fullWidth
            name='phone'
            label='Телефон'
            variant='filled'
            value={contactInfo.phone}
            onChange={handlerChangeContactInfo}
          />
          <TextField
            fullWidth
            name='email'
            label='Email'
            variant='filled'
            value={contactInfo.email}
            onChange={handlerChangeContactInfo}
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
