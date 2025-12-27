"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api/posts";

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생</p>;

  return (
    <main>
      <h1>게시글 목록</h1>

      <button onClick={() => refetch()}>다시 불러오기</button>

      <ul>
        {data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
