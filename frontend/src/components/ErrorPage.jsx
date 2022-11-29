import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const error = useRouteError();
  const { t } = useTranslation();
  const message = error.status === 404 ? t('errorPage.wrongPath') : error.statusText;
  return (
    <div
      id="error-page"
      className="fs-5 d-flex h-100 flex-column justify-content-center align-items-center text-light centered"
    >
      <h1>:(</h1>
      <h3>{t('errorPage.main')}</h3>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
}
