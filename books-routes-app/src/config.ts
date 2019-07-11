export const appName = 'booksroutes';
export const api =
  process.env.NODE_ENV === 'production'
    ? 'http://84.201.158.83:1337/api'
    : 'http://localhost:1337/api';
