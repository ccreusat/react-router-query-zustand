export const fetchArticles = async (page = 0) => {
  //const response = await fetch(`http://localhost:3004/posts?_page=${page}`);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};
