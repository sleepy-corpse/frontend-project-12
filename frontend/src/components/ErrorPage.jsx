import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" className="text-light">
      <h1>:(</h1>
      <h3>Ошибочка вышла</h3>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
