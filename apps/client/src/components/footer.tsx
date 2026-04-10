export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-4 border-t px-4 pb-5 pt-3 text-(--secondary-foreground) border-(--secondary-foreground) bg-(--secondary)">
      <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-base">Task List</p>
        <p className="m-0 text-sm">&copy; {year} Yashodhan Ketkar.</p>
      </div>
    </footer>
  );
};
