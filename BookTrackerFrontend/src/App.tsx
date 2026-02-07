import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import { BooksActivityPage, BooksListPage } from "./pages";
import { MainLayout } from "./views/MainLayout";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path="books" element={<Outlet />}>
          <Route index element={<BooksListPage />} />
          <Route path=":id" element={<BooksActivityPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
