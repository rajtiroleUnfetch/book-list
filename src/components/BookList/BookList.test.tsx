import React from 'react'
import { render, screen, fireEvent } from "@testing-library/react";
import { initialBooks } from "@/data/mockBooks";
import BookList from "./BookList";

// Mock the AddBookModal to simplify DOM interactions
jest.mock("../AddBookModal/AddBookModal.tsx", () => ({
  __esModule: true,
  default: ({ onClose, onAdd }: any) => (
    <div role="dialog">
      <button onClick={() => onAdd("Test Book", "A description")}>
        Confirm Add
      </button>
      <button onClick={onClose}>Close Modal</button>
    </div>
  ),
}));

describe("BookList Component", () => {
  test("renders book list with initial books", () => {
    render(<BookList />);

    initialBooks.forEach((book) => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
    });
  });

  test("opens modal when + Add Book button is clicked", () => {
    render(<BookList />);

    const addButton = screen.getByRole("button", { name: /\+ Add Book/i });
    fireEvent.click(addButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("closes modal when Close Modal button is clicked", () => {
    render(<BookList />);

    const addButton = screen.getByRole("button", { name: /\+ Add Book/i });
    fireEvent.click(addButton);

    const closeButton = screen.getByText(/Close Modal/i);
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("adds a new book when Confirm Add is clicked", () => {
    render(<BookList />);

    const initialBookCount = screen.getAllByRole("listitem").length;

    const addButton = screen.getByRole("button", { name: /\+ Add Book/i });
    fireEvent.click(addButton);

    const confirmButton = screen.getByText(/Confirm Add/i);
    fireEvent.click(confirmButton);

    const updatedBookCount = screen.getAllByRole("listitem").length;
    expect(updatedBookCount).toBe(initialBookCount + 1);

    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });
});
