import React from "react";
import Post from "@/components/posts";

import { groq } from "next-sanity";
import { client } from "@/libs/createClient";

export const revalidate = 30;
const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

export default async function Page() {
  const posts = await client.fetch(query);

  return <Post posts={posts} />;
}
