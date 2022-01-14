import type { WeatherResponse } from '../../../types/weather';

export interface IApiResponse {
  cod: string | number;
}

export interface IApiSuccessResponse extends IApiResponse, WeatherResponse {}

export interface IApiErrorResponse extends IApiResponse {
  message: string;
}
