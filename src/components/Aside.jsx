const Aside = ({ children, className }) => {
  return (
    <aside
      className={`${className} flex flex-col gap-2 bg-[var(--card-background-color)] max-[480px]:w-full z-[102]  p-8 fixed  top-0 w-1/2 h-full overflow-auto transition-all duration-500 `}
    >
      {children}
    </aside>
  );
};
export default Aside;
