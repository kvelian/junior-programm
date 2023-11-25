import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:31299/api'
});

export type Range = {
  fromValue: number;
  toValue: number;
};

export type ContactInfo = {
  telegram: string;
  phone: string;
  email: string;
  socialMedia: string;
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
  countryId: string;
  city: string;
  line1?: string;
  line2?: string;
};

export type Participant = {
  person: Person;
  address: Address;
  age: string;
  about?: string;
};

export interface Cities {
  region: string;
  city: Address['city'];
}

export interface EventType {
  id: number;
  name: string;
}

export interface EventTheme {
  id: number;
  name: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  restrictions?: string;
  typeId: EventType['id'];
  themeId: EventTheme['id'];
  online: boolean;
  address?: Address;
  dataTime: number;
  participantsRange?: Range;
  sponsor: Sponsor;
}

export interface GetEventsParams {
  typeId: EventType['id'];
  themeId: EventTheme['id'];
  city: Address['city'];
  countryId: Address['countryId'];
}

export interface PostEventsRequestsParams {
  participant: Participant;
  eventId: number;
}

export interface EventRequestRes {
  id: number;
  status: number;
  participant: Participant;
  eventId: Event['id'];
}

export const getCities = async (countryId: string): Promise<Cities> => {
  const { data } = await API.get('/cities', {
    params: {
      countryId
    }
  });
  return data;
};

export const getEventsTypes = async (): Promise<EventType> => {
  const { data } = await API.get('/events/types');
  return data;
};

export const getEventsThemes = async (): Promise<EventTheme> => {
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
}: PostEventsRequestsParams): Promise<EventRequestRes> => {
  const { data } = await API.post(`/events/${eventId}/requests`, { participant });
  return data;
};
