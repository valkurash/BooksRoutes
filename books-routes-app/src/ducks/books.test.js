import { api } from "../config";
import reducer, {
  bookForListWrapper,
  defaultBooksState,
  SHOW_BOOKS,
  BOOKS,
  fetchBooksSaga,
  books as booksEntity
} from "./books";
import { SUCCESS, REQUEST, fetchAPI } from "./utils";
import { Map } from "immutable";
import { call, put } from "redux-saga/effects";

const fullQuery = "?page=1&pageSize=3";
const payload = { fullQuery };
const response = {
  books: [
    {
      id: 37,
      title: "Ангелы и демоны",
      isbn: "978-5-17-086211-5",
      cover: "https://booksroutes.info/images/Angeli-i-demoni.jpg",
      description:
        "Иллюминаты. Древний, таинственный орден, прославившийся в Средние вей яростной борьбой с официальной церковью. Легенда далекого прошлого? Возможно...\nНо - почему тогда на груди убитого при загадочных обстоятельствах ученого вырезан именно символ иллюминатов?\nПриглашенный из Гарварда специалист по символике и его напарница, дочь убитого, начинают собственное расследование - и вскоре приходят к невероятным результатам...",
      moderated: true,
      litres:
        "https://www.litres.ru/den-braun/angely-i-demony/?lfrom=349170282",
      ozon:
        "https://www.ozon.ru/context/detail/id/29483032/?partner=booksroutes_info&utm_content=link",
      routes: [
        {
          id: 113,
          name: "Angels and Demons (English)",
          googlemymap: null,
          book_id: 37,
          languages: [
            {
              id: 1,
              ru_name: "Английский",
              en_name: "English",
              iso639: "en",
              _pivot_route_id: 113,
              _pivot_language_id: 1
            }
          ],
          countries: [
            {
              id: 105,
              iso: "IT",
              ru_name: "Италия",
              en_name: "Italy",
              iso3: "ITA",
              numcode: 380,
              phonecode: 39,
              _pivot_route_id: 113,
              _pivot_country_id: 105
            },
            {
              id: 94,
              iso: "VA",
              ru_name: "Ватикан",
              en_name: "Holy See (Vatican City State)",
              iso3: "VAT",
              numcode: 336,
              phonecode: 39,
              _pivot_route_id: 113,
              _pivot_country_id: 94
            }
          ]
        },
        {
          id: 114,
          name: "Anjeli a démoni (Slovenský)",
          googlemymap: null,
          book_id: 37,
          languages: [
            {
              id: 101,
              ru_name: "Словацкий",
              en_name: "Slovak",
              iso639: "sk",
              _pivot_route_id: 114,
              _pivot_language_id: 101
            }
          ],
          countries: [
            {
              id: 105,
              iso: "IT",
              ru_name: "Италия",
              en_name: "Italy",
              iso3: "ITA",
              numcode: 380,
              phonecode: 39,
              _pivot_route_id: 114,
              _pivot_country_id: 105
            },
            {
              id: 206,
              iso: "CH",
              ru_name: "Швейцария",
              en_name: "Switzerland",
              iso3: "CHE",
              numcode: 756,
              phonecode: 41,
              _pivot_route_id: 114,
              _pivot_country_id: 206
            },
            {
              id: 94,
              iso: "VA",
              ru_name: "Ватикан",
              en_name: "Holy See (Vatican City State)",
              iso3: "VAT",
              numcode: 336,
              phonecode: 39,
              _pivot_route_id: 114,
              _pivot_country_id: 94
            }
          ]
        }
      ],
      authors: [
        {
          id: 36,
          name: "Дэн Браун",
          avatar: "",
          _pivot_book_id: 37,
          _pivot_author_id: 36
        }
      ]
    },
    {
      id: 51,
      title: "Бегство в Египет",
      isbn: "5-94278-025-0",
      cover: "https://booksroutes.info/images/begstvo_v_egipet.jpg",
      description:
        "«В детстве я выпиливал лобзиком, не курил и страшно не любил темноту. Полюбил я ее только лет в восемнадцать, когда начал курить, зато перестал выпиливать лобзиком. До сих пор об этом жалею.Я помню, на нашей Прядильной улице, когда меняли булыжную мостовую, мальчишки из соседнего дома в песке отрыли авиационную бомбу. Участок улицы оцепили, жителей из ближайших домов эвакуировали к родственникам и знакомым, а мы, сопливое население, стояли вдоль веревки с флажками и ждали, когда рванет…»",
      moderated: true,
      litres:
        "https://www.litres.ru/aleksandr-etoev/begstvo-v-egipet/?lfrom=349170282",
      ozon: null,
      routes: [
        {
          id: 107,
          name: "Ленинград, 1961 г.",
          googlemymap: null,
          book_id: 51,
          languages: [
            {
              id: 94,
              ru_name: "Русский",
              en_name: "Russian",
              iso639: "ru",
              _pivot_route_id: 107,
              _pivot_language_id: 94
            }
          ],
          countries: [
            {
              id: 177,
              iso: "RU",
              ru_name: "Россия",
              en_name: "Russian Federation",
              iso3: "RUS",
              numcode: 643,
              phonecode: 70,
              _pivot_route_id: 107,
              _pivot_country_id: 177
            }
          ]
        },
        {
          id: 108,
          name: "Маршруты",
          googlemymap: null,
          book_id: 51,
          languages: [
            {
              id: 94,
              ru_name: "Русский",
              en_name: "Russian",
              iso639: "ru",
              _pivot_route_id: 108,
              _pivot_language_id: 94
            }
          ],
          countries: [
            {
              id: 177,
              iso: "RU",
              ru_name: "Россия",
              en_name: "Russian Federation",
              iso3: "RUS",
              numcode: 643,
              phonecode: 70,
              _pivot_route_id: 108,
              _pivot_country_id: 177
            }
          ]
        }
      ],
      authors: [
        {
          id: 53,
          name: "Александр Етоев",
          avatar: "",
          _pivot_book_id: 51,
          _pivot_author_id: 53
        }
      ]
    },
    {
      id: 2,
      title: "Больше, чем просто дом",
      isbn: "978-5-389-06886-5",
      cover: "https://booksroutes.info/images/Bolshe_chem_prosto_dom.jpg",
      description:
        "Фрэнсис Скотт Фицджеральд, возвестивший миру о начале нового века — «века джаза», стоит особняком в современной американской классике. Хемингуэй писал о нем: «Его талант был таким естественным, как узор из пыльцы на крыльях бабочки». Его романы «Великий Гэтсби» и «Ночь нежна» повлияли на формирование новой мировой литературной традиции XX столетия. Однако Фицджеральд также известен как автор блестящих рассказов, из которых на русский язык переводилась лишь небольшая часть (наиболее классические из них представлены в сборнике «Загадочная история Бенджамина Баттона»).\nКнига «Больше чем просто дом» — уже пятая из нескольких запланированных к изданию, после сборников «Новые мелодии печальных оркестров», «Издержки хорошего воспитания», «Успешное покорение мира» и «Три часа между рейсами», — призвана исправить это досадное упущение. Итак, вашему вниманию предлагаются — и снова в эталонных переводах — впервые публикующиеся на русском языке произведения признанного мастера тонкого психологизма.",
      moderated: true,
      litres:
        "https://www.litres.ru/frensis-skott-ficdzherald/bolshe-chem-prosto-dom/?lfrom=349170282",
      ozon:
        "https://www.ozon.ru/context/detail/id/24842178/?partner=booksroutes_info&utm_content=link",
      routes: [
        {
          id: 2,
          name: "Величество",
          googlemymap: null,
          book_id: 2,
          languages: [
            {
              id: 94,
              ru_name: "Русский",
              en_name: "Russian",
              iso639: "ru",
              _pivot_route_id: 2,
              _pivot_language_id: 94
            }
          ],
          countries: [
            {
              id: 225,
              iso: "GB",
              ru_name: "Великобритания",
              en_name: "United Kingdom",
              iso3: "GBR",
              numcode: 826,
              phonecode: 44,
              _pivot_route_id: 2,
              _pivot_country_id: 225
            },
            {
              id: 73,
              iso: "FR",
              ru_name: "Франция",
              en_name: "France",
              iso3: "FRA",
              numcode: 250,
              phonecode: 33,
              _pivot_route_id: 2,
              _pivot_country_id: 73
            },
            {
              id: 226,
              iso: "US",
              ru_name: "США",
              en_name: "United States",
              iso3: "USA",
              numcode: 840,
              phonecode: 1,
              _pivot_route_id: 2,
              _pivot_country_id: 226
            }
          ]
        },
        {
          id: 3,
          name: "Гость со стороны невесты",
          googlemymap: null,
          book_id: 2,
          languages: [
            {
              id: 94,
              ru_name: "Русский",
              en_name: "Russian",
              iso639: "ru",
              _pivot_route_id: 3,
              _pivot_language_id: 94
            }
          ],
          countries: [
            {
              id: 73,
              iso: "FR",
              ru_name: "Франция",
              en_name: "France",
              iso3: "FRA",
              numcode: 250,
              phonecode: 33,
              _pivot_route_id: 3,
              _pivot_country_id: 73
            },
            {
              id: 226,
              iso: "US",
              ru_name: "США",
              en_name: "United States",
              iso3: "USA",
              numcode: 840,
              phonecode: 1,
              _pivot_route_id: 3,
              _pivot_country_id: 226
            }
          ]
        }
      ],
      authors: [
        {
          id: 2,
          name: "Фрэнсис Скотт Фицджеральд",
          avatar: "",
          _pivot_book_id: 2,
          _pivot_author_id: 2
        }
      ]
    }
  ],
  paginationData: { page: 1, pageSize: 3, rowCount: 54, pageCount: 18 }
};
const error = {
  status: "errorStatus",
  message: "errorMessage"
};
describe("books reducer", () => {
  it("should show books", () => {
    const state = new defaultBooksState();

    const newState = reducer(state, {
      type: SHOW_BOOKS,
      payload: { fullQuery }
    });

    expect(newState).toEqual(new defaultBooksState({ fullQuery }));
  });

  it("should load books", () => {
    const state = new defaultBooksState();

    const books = {
      entities: Map({
        [fullQuery]: new bookForListWrapper({
          loading: false,
          entities: response.books,
          paginationData: response.paginationData,
          loaded: true,
          error: false
        })
      }),
      fullQuery: "?page=1&pageSize=3",
      defaultPageSize: 18
    };

    const newStateReq = reducer(state, {
      type: BOOKS[REQUEST],
      payload: { fullQuery }
    });

    const newState = reducer(newStateReq, {
      type: BOOKS[SUCCESS],
      payload: { fullQuery },
      response
    });

    expect(newState).toEqual(new defaultBooksState(books));
  });
});

describe("books saga", () => {
  it("should fetch books successfully", () => {
    const saga = fetchBooksSaga(payload);

    expect(saga.next().value).toEqual(put(booksEntity.request(payload)));

    expect(saga.next().value).toEqual(
      call(fetchAPI, `${api}/books/${payload.fullQuery}`, payload, "GET")
    );
    expect(saga.next({ response }).value).toEqual(
      put(booksEntity.success(payload, { response }))
    );
  });

  it("should fetch books unsuccessfully", () => {
    const saga = fetchBooksSaga(payload);

    expect(saga.next().value).toEqual(put(booksEntity.request(payload)));

    expect(saga.next().value).toEqual(
      call(fetchAPI, `${api}/books/${payload.fullQuery}`, payload, "GET")
    );
    // simulate a promise rejection
    expect(
      saga.throw(error).value,
      put(booksEntity.failure(payload, { error }))
    );
  });
});
