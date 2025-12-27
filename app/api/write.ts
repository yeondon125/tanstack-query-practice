export const createPost = async (newPost: { title: string; body: string }) => {
  const res = await fetch("api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) {
    throw new Error("게시글 등록 실패");
  }

  return res.json();
};
