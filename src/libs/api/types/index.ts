export interface IApiPaginateResponse {
  itemsPerPage: number;
  page: number;
  pages: number;
  items: number;
}

export interface IApiResponse {
  status: 'error' | 'success';
  code: string;
  message: string;
  data: unknown;
  meta?: IApiPaginateResponse | null;
}

export interface IApiSuccessResponse extends IApiResponse {
  status: 'success';
  meta?: IApiPaginateResponse;
}

export interface IApiErrorResponse extends IApiResponse {
  status: 'error';
  meta: null;
}

export interface Document {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
