import { axiosInstance } from './base';

interface Location {
  type: 'Point';
  coordinates: [number, number];
}
export class Address {
  raw: string;
  extra?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  location: Location;
}

interface Phone {
  dialCode?: string;
  number: string;
}

export interface ProfileRequestCreation {
  _id?: string;
  firstName: string;
  lastName: string;
  address: Address;
  phone: Phone;
  email: string;
}

export class ProfilesApi {
  public static async createRequest(profile: ProfileRequestCreation) {
    const res = await axiosInstance.post(`/v1/requests/webform`, profile);
    return res.data;
  }
}
