import  React, { useState, useRef } from "react";
import "./BookList.css";
import { IBookItem } from "@/types";
import { initialBooks } from "@/data/mockBooks";
import AddBookModal from "../AddBookModal/AddBookModal";
import { BookItem } from "../BookItem";

/**
 *
 * Displays user's collection of books and allows adding new books via a modal.
 *
 * 🔹 Accessibility Features:
 * - `aria-live="polite"` announces changes to assistive tech
 * - Focus returns to Add Book button after modal closes
 * - Empty state message is exposed as a status role
 * - Button includes dialog semantics (`aria-haspopup`)
 *
 * @component
 * @returns {JSX.Element} Accessible list of books and interface to add more
 */
export default function BookList(): JSX.Element {
  
  /**
   * List of books in the UI (initially loaded from mock data)
   * @type {[IBookItem[], React.Dispatch<React.SetStateAction<IBookItem[]>>]}
   */
  const [books, setBooks] = useState<IBookItem[]>(initialBooks);

  /**
   * Whether the AddBookModal is visible
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Reference to the Add Book button for returning focus after modal closes
   * @type {React.RefObject<HTMLButtonElement>}
   */
  const addButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Add a new book to the collection
   *
   * @param {string} title - Book title
   * @param {string} description - A brief description of the book
   * @param {string} [imageUrl] - Optional image URL
   */
  const handleAddBook = (
    title: string,
    description: string,
    imageUrl?: string
  ): void => {
    const newBook: IBookItem = {
      id: crypto.randomUUID(),
      title,
      description,
      imageUrl,
    };

    setBooks(prev => [newBook, ...prev]);
  };

  /**
   * Close modal and restore focus to the Add Book button
   */
  const closeModal = (): void => {
    setIsModalOpen(false);
    addButtonRef.current?.focus();
  };

  return (
    <section
      className="booklist-section"
      aria-label="Book collection"
      aria-live="polite"
    >
      {/* Open Add Modal Button */}
      <button
        ref={addButtonRef}
        type="button"
        className="add-book-btn"
        aria-haspopup="dialog"
        aria-controls="add-book-modal"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Book
      </button>

      {/* Add Book Modal */}
      {isModalOpen && (
        <AddBookModal
          onClose={closeModal}
          onAdd={handleAddBook}
        />
      )}

      {/* Book List */}
      <ul className="booklist">
        {books.length === 0 ? (
          <li className="empty-state" role="status">
            📘 No books added yet — try adding one!
          </li>
        ) : (
          books.map(book => (
            <li key={book.id} className="booklist-item">
              <BookItem {...book} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
