export const fetchPosts = async () => {
  const res = await fetch("/api/post");

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
