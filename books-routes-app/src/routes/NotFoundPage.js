import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>404. Туристический маршрут не найден</title>
          <meta name="prerender-status-code" content="404" />
          <meta
            name="description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta
            name="keywords"
            content="литературные маршруты, путешествия, туризм, экскурсии"
          />
          <meta
            property="og:title"
            content="404. Туристический маршрут не найден"
          />
          <meta
            property="og:description"
            content="Литературные маршруты. Туристический путеводитель по местам из книг. Карта для путешествий и обзорных экскурсий."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://booksroutes.info/images/og-image.jpg"
          />
        </Helmet>
        <h2>404. Такой туристический маршрут не найден</h2>
        <div>
          Вы можете <Link to="/add">предложить новый маршрут</Link> или{" "}
          <Link to="/books">вернуться к списку всех доступных книг</Link>.
        </div>
      </div>
    );
  }
}
