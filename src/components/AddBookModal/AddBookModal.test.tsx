import { render, screen, fireEvent } from "@testing-library/react";
import AddBookModal from "./AddBookModal";
import React from "react";

describe("AddBookModal", () => {
  const setup = () => {
    const onAdd = jest.fn();
    const onClose = jest.fn();
    render(<AddBookModal onAdd={onAdd} onClose={onClose} />);
    return { onAdd, onClose };
  };

  test("renders modal with required form fields", () => {
    setup();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });

  test("does not call onAdd if title is missing", () => {
    const { onAdd } = setup();

    fireEvent.click(screen.getByText(/Add Book/i));

    expect(onAdd).not.toHaveBeenCalled();
  });

  test("submits form with valid data", () => {
    const { onAdd, onClose } = setup();

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Book Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "A sample book description" },
    });
    fireEvent.change(screen.getByLabelText(/Image URL/i), {
      target: { value: "https://test.com/image.jpg" },
    });

    fireEvent.click(screen.getByText(/Add Book/i));

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith(
      "New Book Title",
      "A sample book description",
      "https://test.com/image.jpg"
    );

    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when Cancel button is clicked", () => {
    const { onClose } = setup();

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
