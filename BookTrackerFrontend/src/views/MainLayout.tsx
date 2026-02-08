interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col">
      <nav className="p-4">
        <h1 className="text-xl font-bold">Book Tracker</h1>
      </nav>

      <main className="flex-1 flex flex-col min-h-0 p-6">{children}</main>
    </div>
  );
};
