import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookItem } from "../BookItem";
import { PLACEHOLDER_IMAGE } from "@/data/mockBooks";

const defaultProps = {
  id: "1",
  title: "The Hobbit",
  description: "A classic adventure",
  imageUrl: "https://test.com/hobbit.jpg",
};

describe("BookItem Component", () => {
  test("renders title and image", () => {
    render(<BookItem {...defaultProps} />);

    expect(screen.getByText(/The Hobbit/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", defaultProps.imageUrl);
  });

  test("toggles book description visibility", () => {
    render(<BookItem {...defaultProps} />);

    const toggleBtn = screen.getByRole("button", { name: /show details/i });

    fireEvent.click(toggleBtn);
    expect(screen.getByText(/A classic adventure/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByText(/A classic adventure/i)).not.toBeInTheDocument();
  });

  test("falls back to placeholder image on load error", () => {
    render(<BookItem {...defaultProps} />);

    const img = screen.getByRole("img");
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", PLACEHOLDER_IMAGE);
  });

  test("uses fallback title and description if missing", () => {
    render(<BookItem id="2" title="" description="" />);

    expect(screen.getByText(/Untitled Book/i)).toBeInTheDocument();

    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/No description available/i)).toBeInTheDocument();
  });
});
