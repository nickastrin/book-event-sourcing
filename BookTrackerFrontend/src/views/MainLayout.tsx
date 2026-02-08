interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <nav className="flex-none p-4 pt-5">
        <h1 className="text-xl font-bold text-left">Book Tracker</h1>
      </nav>

      <main className="flex-1 flex flex-col min-h-0 p-5">{children}</main>
    </div>
  );
};
