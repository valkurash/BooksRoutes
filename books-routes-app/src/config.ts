export const appName = 'booksroutes';
export const api =
  process.env.NODE_ENV === 'production'
    ? 'http://84.201.156.161:1337/api'
    : 'http://localhost:1337/api';
