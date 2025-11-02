import React, { useState, useEffect, useRef } from "react";
import "./AddBookModal.css";
import { AddBookModalProps } from "./AddBookModal.types";

/**
 * AddBookModal Component
 *
 * Fully accessible dialog allowing users to add a book.
 *
 * - Focus trap inside modal
 * - Escape key closes modal
 * - Proper ARIA roles and required field handling
 *
 * @component
 * @param {AddBookModalProps} props - Props for AddBookModal
 */
export default function AddBookModal({ onClose, onAdd }: AddBookModalProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  /** Auto focus on first input */
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  /** Escape key support */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  /** Focus trap */
  const trapFocus = (e: React.KeyboardEvent) => {
    const elements = modalRef.current?.querySelectorAll<HTMLElement>(
      "input, textarea, button"
    );
    if (!elements?.length) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  /** Form submission */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Book title is required.");
      return;
    }

    onAdd(title, description, imageUrl);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="addBookTitle"
        aria-describedby="formInstructions"
        id="add-book-modal"
        ref={modalRef}
        onKeyDown={trapFocus}
      >
        <h2 id="addBookTitle">Add New Book</h2>

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="book-title"
            className={error ? "label-error" : ""}
          >
            <span aria-hidden="true" className="required">*</span> Title
          </label>

          <input
            ref={firstFieldRef}
            id="book-title"
            type="text"
            value={title}
            aria-required="true"
            aria-invalid={!!error}
            className={error ? "input-error" : ""}
            onChange={(e) => {
              setTitle(e.target.value);
              error && setError(null);
            }}
          />

          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}

          <label htmlFor="book-description">Description</label>
          <textarea
            id="book-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="book-image">Image URL (Optional)</label>
          <input
            id="book-image"
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <div className="modal-actions">
            <button type="submit" className="confirm-btn">
              Add Book
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
