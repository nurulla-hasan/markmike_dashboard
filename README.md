# MarkMike Admin Dashboard

A comprehensive management dashboard for MarkMike, built with React 19, TypeScript, and Vite 7. This platform provides full control over orders, products, users, and specialized design tools.

## ✨ Key Features

- **📊 Dashboard**: Real-time visualization of sales, revenue trends, and recent activities.
- **📦 Order Management**: End-to-end tracking of orders, including production staff assignment, sample approvals, and status updates.
- **👕 Product Management**: Manage catalogs, categories, and attributes (Brands, Colors, Materials, Sizes).
- **🎨 Canvas Editor**: Integrated design studio powered by **Fabric.js** for custom product creation and graphics management.
- **🎟️ Miwahdiss Management**: Specialized system for managing Miwahdiss events and designs.
- **👥 User & Staff Control**: Manage customer accounts, staff permissions, and administrative roles.
- **💰 Quote Requests**: Centralized hub for processing custom price inquiries and customer outreach.
- **🏷️ Standout Deals**: Create and manage promotional offers and exclusive deals.
- **⚙️ CMS & Settings**: Control hero banners, update legal documents (Privacy, Terms), and manage administrative profiles.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query & Redux Persist)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **Canvas Graphics**: [Fabric.js](http://fabricjs.com/)
- **Data Tables**: [TanStack Table](https://tanstack.com/table/v8)
- **Forms**: React Hook Form + Zod for validation.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📂 Project Structure

- `src/app`: Page-level components and route definitions.
- `src/components`: Modular UI components (Shadcn, custom wrappers, and feature-specific components).
- `src/redux`: Redux store, slices, and RTK Query API definitions.
- `src/schemas`: Zod validation schemas for forms and data structures.
- `src/types`: TypeScript interfaces and type definitions.
- `src/layout`: Shared layouts (Auth and Main Dashboard).
- `src/lib`: Core utility functions.

---

Built for **MarkMike**.
