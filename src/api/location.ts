import { axiosInstance } from './base';

export interface GeolocationResult {
  label: string;
  layer: string;
  longitude: number;
  latitude: number;
}

export class LocationApi {
  public static async autocomplete(text: string): Promise<GeolocationResult[]> {
    const res = await axiosInstance.post(`/v1/geocoder/autocomplete`, {
      text,
      size: 5,
    });
    return res.data.results;
  }
}
