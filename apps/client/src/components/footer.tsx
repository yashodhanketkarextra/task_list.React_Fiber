export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <span>Task List</span>
      <span>&copy; {year} Yashodhan Ketkar</span>
    </footer>
  );
};
