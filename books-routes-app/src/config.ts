export const appName = 'booksroutes';
export const api =
  process.env.NODE_ENV === 'production'
    ? 'https://booksroutes-api.azurewebsites.net/api'
    : 'http://localhost:1337/api';
