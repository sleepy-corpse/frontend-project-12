import React from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <>
      <header className="fixed-top border-bottom border-3 py-2 my-header fst-italic fw-bold">
        <a href="/" className="fs-4 text-decoration-none text-light">
          <span className="ms-3">
            Smack
          </span>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
