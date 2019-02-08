import ym from 'react-yandex-metrika';
import { Dispatch, AnyAction } from 'redux';

const trackPage = (page: string) => {
  ym('52291750', 'hit', page);
};

let currentPage = '';

export const yaMetrika = () => (next: Dispatch) => (action: AnyAction) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.pathname}${action.payload.search}`;

    if (currentPage !== nextPage) {
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
