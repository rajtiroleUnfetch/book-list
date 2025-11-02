export type Book = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/96x128.png?text=No+Image";

export const initialBooks: Book[] = [
  {
    id: "1",
    title: "The Art of Silence",
    description:
      "Discover how calm thinking and mindful stillness can shape success and inner clarity.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2014/08/16/18/17/book-419589_1280.jpg"
  },
  {
    id: "2",
    title: "Baby Steps to Growth",
    description:
      "A simple and caring guide to early childhood wellness and healthy development.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/10/24/13/06/book-7543386_1280.jpg"
  }
];
