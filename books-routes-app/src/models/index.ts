export interface IError {
  status: string;
  message: string;
}

export interface IBookData {
  id: number;
  title: string;
  isbn?: string;
  cover?: string;
  description?: string;
  moderated: boolean;
  litres?: string;
  ozon?: string;
  routes: IRoute[];
  authors: IAuthor[];
}

export interface IRoute {
  id: number;
  name: string;
  googlemymap?: string;
  languages: ILanguage[];
  countries: ICountry[];
}

export interface ILanguage {
  id: number;
  ru_name: string;
  en_name: string;
  iso639: string;
}

export interface ICountry {
  id: number;
  iso: string;
  ru_name: string;
  en_name: string;
  iso3?: string;
  numcode?: number;
  phonecode?: number;
}

export interface IAuthor {
  id: number;
  name: string;
  avatar?: string;
}
