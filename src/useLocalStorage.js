const useLocalStorage = (markdown) => {
  if (markdown) localStorage.setItem("markdown", markdown);
  if (localStorage.markdown) return localStorage.getItem("markdown");
  return "## Hello";
};

export default useLocalStorage;
