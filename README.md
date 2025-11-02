# 📚 ReadStack — Book Library App

A simple and accessible book collection app built using **React + TypeScript**.  
Users can view books, reveal details, and add new ones using a fully keyboard-accessible modal form.

🚀 Live Demo: https://your-render-deploy-link-here.com  
(Give me your Render URL and I will update this)

---

## ✨ Features

✅ Add books with title, description & cover image  
✅ Image placeholder auto-fallback  
✅ Local state storage — instant UI updates  
✅ Modal with focus-trap + Escape dismissal  
✅ Strong Accessibility:
- Proper ARIA attributes
- Keyboard navigation support
- Screen-reader labels
- Form validation + visible error messages

✅ Responsive UI — mobile friendly  
✅ Unit tests with React Testing Library & Jest  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|---------|
| **React (TypeScript)** | UI & Components |
| **React Router** | Page Navigation |
| **Jest + React Testing Library** | Component Tests |
| **CSS Modules** | Styling |
| **GitHub + Render** | Version control & Deployment |

---

## 📦 Installation

Clone the repo:

```bash
git clone git@github.com:rajtiroleUnfetch/book-list.git
cd book-list
Install dependencies:

bash
Copy code
npm install
Run development server:

bash
Copy code
npm run dev
App should open at:

➡️ http://localhost:5173 (Vite default)

✅ Testing
To execute all tests:

bash
Copy code
npm test
Run test watcher mode:

bash
Copy code
npm test -- --watch
Check test coverage (optional):

bash
Copy code
npm test -- --coverage
🚀 Deployment
Project is deployed using Render hosting:

✅ Automatic builds from GitHub
✅ Production deployment of main branch

🔗 Live Website: Add Render link here
🔗 GitHub Repo: https://github.com/rajtiroleUnfetch/book-list

🔐 Accessibility Details
✔ Focus trapped inside modal
✔ Error validation on required fields
✔ aria-live announcements
✔ Semantics: <main>, <section>, <article>, headings
✔ Keyboard support for toggles and dialog

📁 Project Structure
css
Copy code
src/
 ├─ components/
 │   ├─ BookList/
 │   ├─ BookItem/
 │   ├─ AddBookModal/
 │
 ├─ data/ (mockBooks.ts)
 ├─ pages/ (BookListPage.tsx)
 ├─ types/ (IBookItem.ts)
 ├─ App.tsx
✍️ Future Enhancements
🔹 Edit & delete book features
🔹 Persistent storage using localStorage or backend
🔹 Search & filter books
🔹 User auth & personal collections