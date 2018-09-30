import ReactGA from "react-ga";
import ym from "react-yandex-metrika";

const options = {};

const trackPage = page => {
  ReactGA.set({
    page,
    ...options
  });
  ReactGA.pageview(page);

  ym("hit", page);
};

let currentPage = "";

export const googleAnalytics = () => next => action => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    const nextPage = `${action.payload.pathname}${action.payload.search}`;

    if (currentPage !== nextPage) {
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
