import { client } from "@/libs/createClient";
import { PostType } from "@/types";
import { groq } from "next-sanity";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: PostType[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

export default async function Page({ params: { slug } }: Props) {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->
    }`;
  const post: PostType = await client.fetch(query, { slug });

  return (
    <>
      <article>
        <h1>{post.title}</h1>
        <p>{post.metaDescription}</p>
      </article>
    </>
  );
}
