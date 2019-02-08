import ReactGA from 'react-ga';
import { Dispatch, AnyAction } from 'redux';

const options = {};

const trackPage = (page: string) => {
  ReactGA.set({
    page,
    ...options,
  });
  ReactGA.pageview(page);
};

let currentPage = '';

export const googleAnalytics = () => (next: Dispatch) => (
  action: AnyAction
) => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    const nextPage = `${action.payload.pathname}${action.payload.search}`;

    if (currentPage !== nextPage) {
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
