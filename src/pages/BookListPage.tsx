import BookList from "@/components/BookList/BookList";
import React from "react";

export const BookListPage: React.FC = () => (
    <React.Suspense fallback={<p>Loading books...</p>}>
      <BookList />
    </React.Suspense>
);

