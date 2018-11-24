import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

const book = {
  id: 37,
  title: "Ангелы и демоны",
  isbn: "978-5-17-086211-5",
  cover: "https://booksroutes.info/images/Angeli-i-demoni.jpg",
  description:
    "Иллюминаты. Древний, таинственный орден, прославившийся в Средние вей яростной борьбой с официальной церковью. Легенда далекого прошлого? Возможно...\nНо - почему тогда на груди убитого при загадочных обстоятельствах ученого вырезан именно символ иллюминатов?\nПриглашенный из Гарварда специалист по символике и его напарница, дочь убитого, начинают собственное расследование - и вскоре приходят к невероятным результатам...",
  moderated: true,
  litres: "https://www.litres.ru/den-braun/angely-i-demony/?lfrom=349170282",
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
};

describe("<BookCard />", () => {
  it("should return <Link/>", () => {
    const wrapper = createShallow({ dive: true })(<BookCard book={book} />);
    expect(wrapper.find(Link).exists()).toBe(true);
    expect(wrapper.find(Link).length).toEqual(2);
  });
});
