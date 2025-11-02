import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { BookListPage } from "./pages";

const App: React.FC = () => {
  return (
    <>


      <header className="app-header">
        <h1 className="title">
          <span aria-hidden="true">📚</span>
          <span className="sr-only">Book</span> Library
        </h1>
        <p className="subtitle">ReadStack — Your Personal Book Collection</p>
      </header>

      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<p>Loading content...</p>}>
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="*" element={<p role="alert">Page Not Found</p>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
