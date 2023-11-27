import type { MockServerConfig } from 'mock-config-server';

const CONTACTINFO = {
  telegram: 'telegram',
  phone: 'phone',
  email: 'email',
  socialMedia: 'socialMedia'
};

const COUNTRIES = [
  { countryId: 'GBR', name: 'Великобритания' },
  { countryId: 'USA', name: 'США' },
  { countryId: 'RUS', name: 'Россия' }
];

const cities = [
  { countryId: 'GBR', region: 'South-Eastern England', city: 'London' },
  { countryId: 'USA', region: 'Northeastern USA', city: 'New York' },
  { countryId: 'RUS', region: 'Moscow region', city: 'Moscow' }
];

const ADDRESS = {
  GBR: {
    countryId: 'GBR',
    city: 'London',
    line1: 'London street 1',
    line2: '1'
  },
  USA: {
    countryId: 'USA',
    city: 'New York',
    line1: 'New York street 2',
    line2: '2'
  },
  RUS: {
    countryId: 'RUS',
    city: 'Moscow',
    line1: 'Moscow street 3',
    line2: '3'
  }
};

const EventsType = [
  { id: 1, name: 'Type 1' },
  { id: 2, name: 'Type 2' },
  { id: 3, name: 'Type 3' }
];

const EventsTheme = [
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
    about: 'about1'
  },
  P2: {
    person: PERSON,
    age: 22,
    address: ADDRESS.USA,
    about: 'about2'
  },
  P3: {
    person: PERSON,
    age: 23,
    address: ADDRESS.RUS,
    about: 'about3'
  }
};

const SPONSOR = {
  legalEntity: true,
  person: PERSON,
  name: 'Sponsor',
  contactInfo: CONTACTINFO
};

const Event = [
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

const EventsRequest = [
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

// class TodoService{
//   constructor(baseUrl = 'http://localhost:31299/todos'){
//       this.baseUrl = baseUrl;
//   }
//   getTodo() {return fetch(`${this.baseUrl}`).then((res) => res.text())}
//   getTodos(id) {return fetch(`${this.baseUrl}/${id}`).then((res) => res.text())}
//   deleteTodo(id) {return fetch(`${this.baseUrl}/${id}`, {method: 'DELETE'}).then((res) => res.text())}
//   postTodos(body) {return fetch(`${this.baseUrl}`, {method: 'POST', headers: {
//    'Content-Type': 'application/json; charset=utf-8'},body: JSON.stringify(body)}).then((res) => res.json())}
//   putTodos = (id, body) => fetch(`${this.baseUrl}/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json; charset=utf-8'},body: JSON.stringify(body)}).then((res) => res.json())
// }

// const todoService = new TodoService();

export const mockServerConfig: MockServerConfig = {
  baseUrl: '/api',
  rest: {
    configs: [
      {
        path: '/countries',
        method: 'get',
        routes: [
          {
            data: COUNTRIES,
            interceptors: {
              response: (data, { request }) => {
                const { countryId, name } = request.query;
                const countries = data.filter((country) => {
                  if (countryId && country.countryId !== countryId) return false;
                  if (name && country.name !== name) return false;
                  return true;
                });
                return countries;
              }
            }
          }
        ]
      },
      {
        path: '/countries/cities',
        method: 'get',
        routes: [
          {
            data: cities,
            interceptors: {
              response: (data, { request }) => {
                const { countryId, city } = request.query;
                const cities = data.filter((cities) => {
                  if (countryId && cities.countryId !== countryId) return false;
                  if (city && cities.city !== city) return false;
                  return true;
                });
                return cities;
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
            data: Event,
            interceptors: {
              response: (data, { request }) => {
                const { countryId, themeId, typeId, city } = request.query;
                const events = data.filter((event) => {
                  if (countryId && event.address.countryId !== countryId) return false;
                  if (
                    themeId &&
                    ((event.themeId !== themeId && !Array.isArray(themeId)) ||
                      (Array.isArray(themeId) && !themeId?.includes(event.themeId.toString())))
                  )
                    return false; // TODO: мультиселект
                  if (
                    typeId &&
                    ((event.typeId !== typeId && !Array.isArray(typeId)) ||
                      (Array.isArray(typeId) && !typeId?.includes(event.typeId.toString())))
                  )
                    return false; // TODO: мультиселект
                  if (city && event.address.city !== city) return false;
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
            data: EventsType,
            interceptors: {
              response: (data, { request }) => {
                const { id, name } = request.query;
                const eventstype = data.filter((eventstype) => {
                  if (id && eventstype.id !== +id) return false;
                  if (name && eventstype.name !== name) return false;
                  return true;
                });
                return eventstype;
              }
            }
          }
        ]
      },
      {
        path: '/events/themes',
        method: 'get',
        routes: [
          {
            data: EventsTheme,
            interceptors: {
              response: (data, { request }) => {
                const { id, name } = request.query;
                const eventstheme = data.filter((eventstheme) => {
                  if (id && eventstheme.id !== +id) return false;
                  if (name && eventstheme.name !== name) return false;
                  return true;
                });
                return eventstheme;
              }
            }
          }
        ]
      },
      {
        path: '/events/:eventId/requests',
        method: 'post',
        routes: [
          {
            data: EventsRequest[0],
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
