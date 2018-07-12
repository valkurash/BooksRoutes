import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Страница не найдена</title>
          <meta name="description" content="Маршруты на карте для путешествий или обзорных экскурсий по местам из своих любимых книг" />
        </Helmet>
        <h1>404. Страница не найдена</h1>
      </div>
    );
  }
}
