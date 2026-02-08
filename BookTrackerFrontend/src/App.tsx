import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { BooksActivityPage, BooksListPage } from "./pages";
import { MainLayout } from "./views/MainLayout";

function App() {
  return (
    <Routes>
      <Route
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path="/" element={<Navigate to="/books" replace />} />
        <Route path="books" element={<Outlet />}>
          <Route index element={<BooksListPage />} />
          <Route path=":id" element={<BooksActivityPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
