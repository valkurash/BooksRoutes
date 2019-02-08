import ym from 'react-yandex-metrika';

const trackPage = page => {
  ym(52291750, 'hit', page);
};

let currentPage = "";

export const yaMetrika = () => next => action => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    const nextPage = `${action.payload.pathname}${action.payload.search}`;

    if (currentPage !== nextPage) {
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
