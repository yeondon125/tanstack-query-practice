export const fetchPosts = async () => {
  const res = await fetch("/api/posts");

  if (!res.ok) {
    return 0;
  }

  return res.json();
};
