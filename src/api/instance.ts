import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:31299/api'
});

export type Range = {
  fromValue?: number;
  toValue?: number;
};

export type Country = {
  id: string;
  name: string;
};

export type City = {
  id: number;
  region: string;
  city: string;
};

export type ContactInfo = {
  telegram?: string;
  phone?: string;
  email?: string;
  socialMedia?: string;
};

export type Person = {
  lastName: string;
  firstName: string;
  middleName?: string;
};

export type Sponsor = {
  person?: Person;
  legalEntity: boolean;
  name?: string;
  contactInfo: ContactInfo;
};

export type Address = {
  countryId?: Country['id'];
  cityId?: City['id'];
  line1?: string;
  line2?: string;
};

export type Participant = {
  person: Person;
  address?: Address;
  age?: number;
  about?: string;
  contactInfo: ContactInfo;
};

export type EventType = {
  id: number;
  name: string;
};

export type EventTheme = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  restrictions?: string;
  typeId: EventType['id'];
  themeId: EventTheme['id'];
  online: boolean;
  address?: Address;
  dateTime: number;
  participantsRange?: Range;
  sponsor: Sponsor;
};

export type EventRequest = {
  id: number;
  status: number;
  participant: Participant;
  eventId: Event['id'];
};

export interface GetEventsParams {
  typeId?: EventType['id'][];
  themeId?: EventTheme['id'][];
  cityId?: City['id'];
  countryId?: Country['id'];
}

export interface PostEventsRequestsParams {
  participant: Participant;
  eventId: number;
}

export const getCountries = async (): Promise<Country[]> => {
  const { data } = await API.get('/countries');
  return data;
};

export const getCities = async (countryId: string): Promise<City[]> => {
  const { data } = await API.get('/countries/cities', {
    params: {
      countryId
    }
  });
  return data;
};

export const getEventsTypes = async (): Promise<EventType[]> => {
  const { data } = await API.get('/events/types');
  return data;
};

export const getEventsThemes = async (): Promise<EventTheme[]> => {
  const { data } = await API.get('/events/themes');
  return data;
};

export const getEvents = async (params: GetEventsParams): Promise<Event[]> => {
  const { data } = await API.get('/events', {
    params
  });
  return data;
};

export const postEventsRequests = async ({
  participant,
  eventId
}: PostEventsRequestsParams): Promise<EventRequest> => {
  const { data } = await API.post(`/events/${eventId}/requests`, { participant });
  return data;
};
