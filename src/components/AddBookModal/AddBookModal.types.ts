export interface AddBookModalProps {
  onClose: () => void;
  onAdd: (title: string, description: string, imageUrl?: string) => void;
}
