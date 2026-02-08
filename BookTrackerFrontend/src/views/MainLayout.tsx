import { useParams } from "react-router";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { id } = useParams();

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex flex-row items-center shrink-0 p-4 pt-5">
        {id && (
          <button
            className="icon me-4 flex items-center"
            onClick={() => window.history.back()}
          >
            <span className="material-symbols-outlined block">arrow_back</span>
          </button>
        )}

        <h1 className="text-xl font-bold text-left">Book Tracker</h1>
      </nav>

      <main className="flex-1 flex flex-col min-h-0 p-5">{children}</main>
    </div>
  );
};
