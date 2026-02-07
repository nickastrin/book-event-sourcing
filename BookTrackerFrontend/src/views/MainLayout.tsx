interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen">
      <nav className="p-4">
        <h1 className="text-xl font-bold">Book Tracker</h1>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
};
