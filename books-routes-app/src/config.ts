export const appName = 'booksroutes';
export const api =
  process.env.NODE_ENV === 'production'
    ? 'https://booksroutes.info/api'
    : 'http://localhost:1337/api';
