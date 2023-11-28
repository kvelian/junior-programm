import type { MockServerConfig } from 'mock-config-server';
import type {
  City,
  Country,
  Event,
  GetEventsParams,
  EventType,
  EventTheme,
  EventRequest
} from './src/api/instance';

const CONTACTINFO = {
  telegram: 'telegram',
  phone: 'phone',
  email: 'email',
  socialMedia: 'socialMedia'
};

const COUNTRIES = [
  { id: 'GBR', name: 'Великобритания' },
  { id: 'USA', name: 'США' },
  { id: 'RUS', name: 'Россия' }
];

type Cities = {
  [key: string]: City[];
};

type GetCitiesParams = {
  countryId: string;
};

const CITIES = {
  GBR: [{ id: 1, region: 'South-Eastern England', city: 'London' }],
  USA: [{ id: 2, region: 'Northeastern USA', city: 'New York' }],
  RUS: [{ id: 3, region: 'Moscow region', city: 'Moscow' }]
};

const ADDRESS = {
  GBR: {
    countryId: 'GBR',
    cityId: 11,
    line1: 'London street 1',
    line2: '1'
  },
  USA: {
    countryId: 'USA',
    cityId: 21,
    line1: 'New York street 2',
    line2: '2'
  },
  RUS: {
    countryId: 'RUS',
    cityId: 31,
    line1: 'Moscow street 3',
    line2: '3'
  }
};

const EVENTS_TYPES = [
  { id: 1, name: 'Type 1' },
  { id: 2, name: 'Type 2' },
  { id: 3, name: 'Type 3' }
];

const EVENTS_THEMES = [
  { id: 1, name: 'Theme 1' },
  { id: 2, name: 'Theme 2' },
  { id: 3, name: 'Theme 3' }
];

const PERSON = {
  lastName: 'Ivanov',
  firstName: 'Ivan',
  middleName: 'Ivanovich'
};

const PARTICIPANT = {
  P1: {
    person: PERSON,
    age: 21,
    address: ADDRESS.GBR,
    about: 'about1',
    contactInfo: CONTACTINFO
  },
  P2: {
    person: PERSON,
    age: 22,
    address: ADDRESS.USA,
    about: 'about2',
    contactInfo: CONTACTINFO
  },
  P3: {
    person: PERSON,
    age: 23,
    address: ADDRESS.RUS,
    about: 'about3',
    contactInfo: CONTACTINFO
  }
};

const SPONSOR = {
  legalEntity: true,
  person: PERSON,
  name: 'Sponsor',
  contactInfo: CONTACTINFO
};

const EVENTS = [
  {
    id: 1,
    name: 'Успешный запрос',
    description: 'Event 1 description',
    restrictions: 'Event 1 restrictions',
    typeId: 1,
    themeId: 1,
    online: true,
    address: ADDRESS.GBR,
    dateTime: 1700412339336,
    participantsRange: {
      fromValue: 1,
      toValue: 100
    },
    sponsor: SPONSOR
  },
  {
    id: 2,
    name: 'Неуспешный запрос',
    description: 'Event 2 description',
    restrictions: 'Event 2 restrictions',
    typeId: 2,
    themeId: 2,
    online: true,
    address: ADDRESS.USA,
    dateTime: 1700412339336,
    participantsRange: {
      fromValue: 2,
      toValue: 200
    },
    sponsor: SPONSOR
  },
  {
    id: 3,
    name: 'Таймаут',
    description: 'Event 3 description',
    restrictions: 'Event 3 restrictions',
    typeId: 3,
    themeId: 3,
    online: true,
    address: ADDRESS.RUS,
    dateTime: 1700412339336,
    participantsRange: {
      fromValue: 3,
      toValue: 300
    },
    sponsor: SPONSOR
  }
];

const EVENTS_REQUESTS = [
  {
    id: 1,
    status: 0,
    participant: PARTICIPANT.P1,
    eventId: 1
  },
  {
    id: 2,
    status: 1,
    participant: PARTICIPANT.P2,
    eventId: 2
  },
  {
    id: 3,
    status: 2,
    participant: PARTICIPANT.P3,
    eventId: 3
  }
];

export const mockServerConfig: MockServerConfig = {
  baseUrl: '/api',
  rest: {
    configs: [
      {
        path: '/countries',
        method: 'get',
        routes: [
          {
            data: COUNTRIES as Country[]
          }
        ]
      },
      {
        path: '/countries/cities',
        method: 'get',
        routes: [
          {
            data: CITIES as Cities,
            interceptors: {
              response: (data, { request }) => {
                const { countryId } = request.query as GetCitiesParams;
                return data[countryId];
              }
            }
          }
        ]
      },
      {
        path: '/events',
        method: 'get',
        routes: [
          {
            data: EVENTS as Event[],
            interceptors: {
              response: (data, { request }) => {
                const { countryId, themeId, typeId, cityId } = request.query as GetEventsParams;
                const events = data.filter((event) => {
                  if (countryId && event.address.countryId !== countryId) return false;
                  if (
                    themeId &&
                    !(
                      (!Array.isArray(themeId) && event.themeId.toString() === themeId) ||
                      (Array.isArray(themeId) && themeId?.includes(event.themeId.toString()))
                    )
                  )
                    return false;

                  if (
                    typeId &&
                    !(
                      (!Array.isArray(typeId) && event.typeId.toString() === typeId) ||
                      (Array.isArray(typeId) && typeId?.includes(event.typeId.toString()))
                    )
                  )
                    return false;
                  if (cityId && event.address.cityId !== cityId) return false;
                  return true;
                });
                return events;
              }
            }
          },
          {
            data: { success: false, message: 'Event not found' },
            entities: {
              query: {
                eventId: 2
              }
            }
          },
          {
            data: { success: false, message: '408 Request Timeout' },
            interceptors: {
              response: async (data, { setStatusCode, setDelay }) => {
                await setDelay(2000);
                setStatusCode(408);
                return data;
              }
            },
            entities: {
              query: {
                eventId: 3
              }
            }
          }
        ]
      },
      {
        path: '/events/types',
        method: 'get',
        routes: [
          {
            data: EVENTS_TYPES as EventType[]
          }
        ]
      },
      {
        path: '/events/themes',
        method: 'get',
        routes: [
          {
            data: EVENTS_THEMES as EventTheme[]
          }
        ]
      },
      {
        path: '/events/:eventId/requests',
        method: 'post',
        routes: [
          {
            data: EVENTS_REQUESTS[0] as EventRequest,
            entities: {
              params: {
                eventId: 1
              }
            }
          },
          {
            data: { success: false, message: 'Event not found' },
            entities: {
              params: {
                eventId: 2
              }
            }
          },
          {
            data: { success: false, message: '408 Request Timeout' },
            interceptors: {
              response: async (data, { setStatusCode, setDelay }) => {
                await setDelay(2000);
                setStatusCode(408);
                return data;
              }
            },
            entities: {
              params: {
                eventId: 3
              }
            }
          }
        ]
      }
    ]
  }
};

export default mockServerConfig;
