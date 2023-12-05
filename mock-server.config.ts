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
  { id: 'RUS', name: 'Россия' },
  { id: 'FRA', name: 'Франция' },
  { id: 'GER', name: 'Германия' },
  { id: 'JPN', name: 'Япония' },
  { id: 'CAN', name: 'Канада' },
  { id: 'AUS', name: 'Австралия' },
  { id: 'CHN', name: 'Китай' },
  { id: 'BRA', name: 'Бразилия' },
  { id: 'ITA', name: 'Италия' },
  { id: 'ESP', name: 'Испания' },
  { id: 'MEX', name: 'Мексика' },
  { id: 'IND', name: 'Индия' },
  { id: 'ARG', name: 'Аргентина' },
  { id: 'ZAF', name: 'Южная Африка' },
  { id: 'SWE', name: 'Швеция' },
  { id: 'NLD', name: 'Нидерланды' },
  { id: 'KOR', name: 'Южная Корея' },
  { id: 'POL', name: 'Польша' }
];

type Cities = {
  [key: string]: City[];
};

type GetCitiesParams = {
  countryId: string;
};

const CITIES = {
  GBR: [
    { id: 1, region: 'South-Eastern England', city: 'Лондон' },
    { id: 2, region: 'Scotland', city: 'Эдинбург' },
    { id: 3, region: 'Wales', city: 'Кардифф' },
    { id: 4, region: 'Northern Ireland', city: 'Белфаст' },
    { id: 5, region: 'South-West England', city: 'Бристоль' },
    { id: 6, region: 'North-West England', city: 'Манчестер' }
  ],
  USA: [
    { id: 7, region: 'Western USA', city: 'Сан-Франциско' },
    { id: 8, region: 'Northeastern USA', city: 'Нью-Йорк' },
    { id: 9, region: 'Midwestern USA', city: 'Чикаго' },
    { id: 10, region: 'Southern USA', city: 'Майами' },
    { id: 11, region: 'Western USA', city: 'Лос-Анджелес' },
    { id: 12, region: 'Northeastern USA', city: 'Бостон' }
  ],
  RUS: [
    { id: 13, region: 'Moscow oblast', city: 'Москва' },
    { id: 14, region: 'Leningrad oblast', city: 'Санкт-Петербург' },
    { id: 15, region: 'Sverdlovsk oblast', city: 'Екатеринбург' },
    { id: 16, region: 'Novosibirsk oblast', city: 'Новосибирск' },
    { id: 17, region: 'Republic of Tatarstan', city: 'Казань' },
    { id: 18, region: 'Krasnodar Krai', city: 'Сочи' }
  ],
  FRA: [
    { id: 19, region: 'Île-de-France', city: 'Париж' },
    { id: 20, region: 'FRA', city: 'Марсель' },
    { id: 21, region: 'FRA', city: 'Лион' },
    { id: 22, region: 'FRA', city: 'Тулуза' },
    { id: 23, region: 'FRA', city: 'Ницца' },
    { id: 24, region: 'FRA', city: 'Бордо' }
  ],
  GER: [
    { id: 25, region: 'Berlin', city: 'Берлин' },
    { id: 26, region: 'Munich', city: 'Мюнхен' },
    { id: 27, region: 'Hamburg', city: 'Гамбург' },
    { id: 28, region: 'Cologne', city: 'Кёльн' },
    { id: 29, region: 'Frankfurt', city: 'Франкфурт' },
    { id: 30, region: 'Stuttgart', city: 'Штутгарт' }
  ],
  JPN: [
    { id: 31, region: 'Kanto', city: 'Токио' },
    { id: 32, region: 'Kanto', city: 'Йокогама' },
    { id: 33, region: 'Kansai', city: 'Осака' },
    { id: 34, region: 'Kansai', city: 'Фуку' },
    { id: 35, region: 'Kansai', city: 'Киото' },
    { id: 36, region: 'Kansai', city: 'Нагоя' }
  ],
  CAN: [
    { id: 37, region: 'Ontario', city: 'Торонто' },
    { id: 38, region: 'Quebec', city: 'Монреаль' },
    { id: 39, region: 'British Columbia', city: 'Ванкувер' },
    { id: 40, region: 'Alberta', city: 'Калгари' },
    { id: 41, region: 'Manitoba', city: 'Виннипег' },
    { id: 42, region: 'Saskatchewan', city: 'Саскатун' }
  ],
  AUS: [
    { id: 43, region: 'New South Wales', city: 'Сидней' },
    { id: 44, region: 'Victoria', city: 'Мельбурн' },
    { id: 45, region: 'Queensland', city: 'Брисбен' },
    { id: 46, region: 'Western Australia', city: 'Перт' },
    { id: 47, region: 'South Australia', city: 'Аделаида' },
    { id: 48, region: 'Tasmania', city: 'Хобарт' }
  ],
  CHN: [
    { id: 49, region: 'Beijing', city: 'Пекин' },
    { id: 50, region: 'Shanghai', city: 'Шанхай' },
    { id: 51, region: 'Guangdong', city: 'Гуанчжоу' },
    { id: 52, region: 'Shenzhen', city: 'Шэньчжэнь' },
    { id: 53, region: 'Hangzhou', city: 'Ханчжоу' },
    { id: 54, region: 'Chengdu', city: 'Чэнду' }
  ],
  BRA: [
    { id: 55, region: 'São Paulo', city: 'Сан-Паулу' },
    { id: 56, region: 'Рио-де-Жанейро', city: 'Рио-де-Жанейро' },
    { id: 57, region: 'Сальвадор', city: 'Сальвадор' },
    { id: 58, region: 'Бразилиа', city: 'Бразилиа' },
    { id: 59, region: 'Форталеза', city: 'Форталеза' },
    { id: 60, region: 'Белу-Оризонти', city: 'Белу-Оризонти' }
  ],
  ITA: [
    { id: 71, region: 'Lombardy', city: 'Милан' },
    { id: 72, region: 'Veneto', city: 'Венеция' },
    { id: 73, region: 'Tuscany', city: 'Флоренция' },
    { id: 74, region: 'Campania', city: 'Неаполь' },
    { id: 75, region: 'Sicily', city: 'Палермо' },
    { id: 76, region: 'Lazio', city: 'Рим' }
  ],
  ESP: [
    { id: 77, region: 'Madrid', city: 'Мадрид' },
    { id: 78, region: 'Barcelona', city: 'Барселона' },
    { id: 79, region: 'Valencia', city: 'Валенсия' },
    { id: 80, region: 'Seville', city: 'Севилья' },
    { id: 81, region: 'Bilbao', city: 'Бильбао' },
    { id: 82, region: 'Malaga', city: 'Малага' }
  ],
  MEX: [
    { id: 83, region: 'Mexico City', city: 'Мехико' },
    { id: 84, region: 'Guadalajara', city: 'Гвадалахара' },
    { id: 85, region: 'Monterrey', city: 'Монтеррей' },
    { id: 86, region: 'Puebla', city: 'Пуэбла' },
    { id: 87, region: 'Tijuana', city: 'Тихуана' },
    { id: 88, region: 'Querétaro', city: 'Керетаро' }
  ],
  IND: [
    { id: 89, region: 'Delhi', city: 'Дели' },
    { id: 90, region: 'Mumbai', city: 'Мумбаи' },
    { id: 91, region: 'Bangalore', city: 'Бангалор' },
    { id: 92, region: 'Kolkata', city: 'Калькутта' },
    { id: 93, region: 'Chennai', city: 'Ченнаи' },
    { id: 94, region: 'Hyderabad', city: 'Хайдарабад' }
  ],
  ARG: [
    { id: 95, region: 'Buenos Aires', city: 'Буэнос-Айрес' },
    { id: 96, region: 'Buenos Aires', city: 'Мар-дель-Плата' },
    { id: 97, region: 'Buenos Aires', city: 'Ла-Плата' },
    { id: 98, region: 'Buenos Aires', city: 'Некочеа' },
    { id: 99, region: 'Buenos Aires', city: 'Мерседес' },
    { id: 100, region: 'Buenos Aires', city: 'Абуди' }
  ],
  ZAF: [
    { id: 101, region: 'Gauteng', city: 'Йоханнесбург' },
    { id: 102, region: 'Western Cape', city: 'Кейптаун' },
    { id: 103, region: 'KwaZulu-Natal', city: 'Дурбан' },
    { id: 104, region: 'Eastern Cape', city: 'Порт-Элизабет' },
    { id: 105, region: 'Mpumalanga', city: 'Нелспруит' },
    { id: 106, region: 'Limpopo', city: 'Полокване' }
  ],
  SWE: [
    { id: 107, region: 'Stockholm', city: 'Стокгольм' },
    { id: 108, region: 'Västra Götaland', city: 'Гётеборг' },
    { id: 109, region: 'Skåne', city: 'Мальмё' },
    { id: 110, region: 'Östergötland', city: 'Норрчёпинг' },
    { id: 111, region: 'Uppsala', city: 'Уппсала' },
    { id: 112, region: 'Västmanland', city: 'Вестерос' }
  ],
  NLD: [
    { id: 113, region: 'North Holland', city: 'Амстердам' },
    { id: 114, region: 'South Holland', city: 'Роттердам' },
    { id: 115, region: 'North Brabant', city: 'Эйндховен' },
    { id: 116, region: 'Utrecht', city: 'Утрехт' },
    { id: 117, region: 'Gelderland', city: 'Арнем' },
    { id: 118, region: 'Overijssel', city: 'Энсхеде' }
  ],
  KOR: [
    { id: 119, region: 'Seoul', city: 'Сеул' },
    { id: 120, region: 'Busan', city: 'Пусан' },
    { id: 121, region: 'Incheon', city: 'Инчхон' },
    { id: 122, region: 'Daegu', city: 'Тэгу' },
    { id: 123, region: 'Daejeon', city: 'Тэджон' },
    { id: 124, region: 'Gwangju', city: 'Кванджу' }
  ],
  POL: [
    { id: 125, region: 'Masovian', city: 'Варшава' },
    { id: 126, region: 'Pomeranian', city: 'Гданьск' },
    { id: 127, region: 'Silesian', city: 'Катовице' },
    { id: 128, region: 'Greater Poland', city: 'Познань' },
    { id: 129, region: 'Lower Silesian', city: 'Вроцлав' },
    { id: 130, region: 'Lublin', city: 'Люблин' }
  ]
};

const ADDRESS = {
  GBR: {
    countryId: 'GBR',
    cityId: CITIES.GBR[0].id,
    line1: 'GBR street 1',
    line2: '1'
  },
  USA: {
    countryId: 'USA',
    cityId: CITIES.USA[0].id,
    line1: 'USA street 2',
    line2: '2'
  },
  RUS: {
    countryId: 'RUS',
    cityId: CITIES.RUS[0].id,
    line1: 'RUS street 3',
    line2: '3'
  },
  FRA: {
    countryId: 'FRA',
    cityId: CITIES.FRA[0].id,
    line1: 'FRA street 4',
    line2: '4'
  },
  GER: {
    countryId: 'GER',
    cityId: CITIES.GER[0].id,
    line1: 'GER street 5',
    line2: '5'
  },
  JPN: {
    countryId: 'JPN',
    cityId: CITIES.JPN[0].id,
    line1: 'JPN street 6',
    line2: '6'
  },
  CAN: {
    countryId: 'CAN',
    cityId: CITIES.CAN[0].id,
    line1: 'CAN street 7',
    line2: '7'
  },
  AUS: {
    countryId: 'AUS',
    cityId: CITIES.AUS[0].id,
    line1: 'AUS street 8',
    line2: '8'
  },
  CHN: {
    countryId: 'CHN',
    cityId: CITIES.CHN[0].id,
    line1: 'CHN street 9',
    line2: '9'
  },
  BRA: {
    countryId: 'BRA',
    cityId: CITIES.BRA[0].id,
    line1: 'BRA street 10',
    line2: '10'
  },
  ITA: {
    countryId: 'ITA',
    cityId: CITIES.ITA[0].id,
    line1: 'ITA street 11',
    line2: '11'
  },
  ESP: {
    countryId: 'ESP',
    cityId: CITIES.ESP[0].id,
    line1: 'ESP street 12',
    line2: '12'
  },
  MEX: {
    countryId: 'MEX',
    cityId: CITIES.MEX[0].id,
    line1: 'MEX street 13',
    line2: '13'
  },
  IND: {
    countryId: 'IND',
    cityId: CITIES.IND[0].id,
    line1: 'IND street 14',
    line2: '14'
  },
  ARG: {
    countryId: 'ARG',
    cityId: CITIES.ARG[0].id,
    line1: 'ARG street 15',
    line2: '15'
  },
  ZAF: {
    countryId: 'ZAF',
    cityId: CITIES.ZAF[0].id,
    line1: 'ZAF street 16',
    line2: '16'
  },
  SWE: {
    countryId: 'SWE',
    cityId: CITIES.SWE[0].id,
    line1: 'SWE street 17',
    line2: '17'
  },
  NLD: {
    countryId: 'NLD',
    cityId: CITIES.NLD[0].id,
    line1: 'NLD street 18',
    line2: '18'
  },
  KOR: {
    countryId: 'KOR',
    cityId: CITIES.KOR[0].id,
    line1: 'KOR street 19',
    line2: '19'
  },
  POL: {
    countryId: 'POL',
    cityId: CITIES.POL[0].id,
    line1: 'POL street 20',
    line2: '20'
  }
};

const EVENTS_TYPES = [
  { id: 1, name: 'Тип 1' },
  { id: 2, name: 'Тип 2' },
  { id: 3, name: 'Тип 3' }
];

const EVENTS_THEMES = [
  { id: 1, name: 'Тема 1' },
  { id: 2, name: 'Тема 2' },
  { id: 3, name: 'Тема 3' }
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

const EVENTS: Event[] = [
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
              response: (data: Event[], { request }) => {
                const { countryId, themeId, typeId, cityId } = request.query as GetEventsParams;
                const events = data.filter((event) => {
                  console.log(countryId, cityId, event.typeId, typeId);
                  console.log(
                    typeId,
                    !Array.isArray(typeId),
                    event.typeId === typeId,
                    Array.isArray(typeId),
                    typeId?.includes(event.typeId.toString())
                  );
                  if (countryId && event.address?.countryId !== countryId) return false;
                  if (cityId && event.address?.cityId !== +cityId) return false;
                  if (
                    themeId &&
                    !(
                      (!Array.isArray(themeId) && event.themeId === themeId) ||
                      (Array.isArray(themeId) && themeId?.includes(event.themeId.toString()))
                    )
                  )
                    return false;
                  if (
                    typeId &&
                    !(
                      (!Array.isArray(typeId) && event.typeId === typeId) ||
                      (Array.isArray(typeId) && typeId?.includes(event.typeId.toString()))
                    )
                  )
                    return false;
                  return true;
                });
                return events;
              }
            }
          },
          {
            data: { success: false, message: 'Event not found' },
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(400);
                return data;
              }
            },
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
            interceptors: {
              response: (data, { setStatusCode }) => {
                setStatusCode(400);
                return data;
              }
            },
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
