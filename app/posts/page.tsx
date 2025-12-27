"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/write";
import { fetchPosts } from "../api/posts";

export default function HomePage() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {
    data: posts,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts"], (old: any) => {
        return [newPost, ...(old ?? [])];
      });

      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      title,
      body,
    });
  };

  if (isPending) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;

  return (
    <main>
      <h1>게시글 등록</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            placeholder="내용"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isPosting}>
          {isPosting ? "등록 중..." : "등록"}
        </button>
      </form>

      <hr />

      <h2>게시글 목록</h2>

      <button onClick={() => refetch()}>목록 다시 불러오기</button>

      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}
