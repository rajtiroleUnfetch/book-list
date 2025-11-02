import React, { useState } from "react";
import "./BookItem.css";
import { IBookItem } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/data/mockBooks";

/**
 * BookItem Component
 *
 * Displays a book card with:
 * - Cover image (with fallback)
 * - Title
 * - Expandable description to improve scanability
 *
 *  Accessibility Enhancements:
 * - Proper headings and article semantics
 * - Keyboard-accessible toggle button with `aria-expanded`
 * - `aria-controls` links button to description content
 * - Visible focus indicators for keyboard users (CSS required)
 *
 * @component
 * @param {IBookItem} props - The book data object
 * @param {string} props.id - Unique book ID, used to associate content for accessibility
 * @param {string} props.title - Title of the book (required)
 * @param {string} [props.description] - Book summary text
 * @param {string} [props.imageUrl] - Optional cover image URL
 * @returns {JSX.Element} Accessible book card UI
 */
export const BookItem = ({
  id,
  title,
  description,
  imageUrl
}: IBookItem): JSX.Element => {
  // Screen reader-safe fallback values
  const safeTitle = title?.trim() || "Untitled Book";
  const safeDescription = description?.trim() || "No description available.";

  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl?.trim() || PLACEHOLDER_IMAGE);

  // Associate button and description content for ARIA
  const descId = `book-desc-${id}`;

  return (
    <article
      className="book-card"
      role="region"
      aria-labelledby={`book-title-${id}`}
    >
      {/* Book image with fallback + lazy loading for performance */}
      <img
        className="book-image"
        src={imgSrc}
        alt={safeTitle}
        loading="lazy"
        onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
      />

      <div className="book-info">
        <h2 id={`book-title-${id}`} className="book-title">
          {safeTitle}
        </h2>

        <button
          type="button"
          className="toggle-btn"
          aria-expanded={visible}
          aria-controls={descId}
          onClick={() => setVisible(prev => !prev)}
        >
          {visible ? "Hide Details" : "Show Details"}
        </button>

        {/* Description region, hidden until expanded */}
        {visible && (
          <p id={descId} className="book-desc">
            {safeDescription}
          </p>
        )}
      </div>
    </article>
  );
};
