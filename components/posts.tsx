import { urlFor } from "@/libs/createClient";
import { PostType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface props {
  posts: PostType[];
}

export default function Post({ posts }: props) {
  console.log(posts[0].slug);

  return (
    <>
      {posts.map((post) => (
        <Link href={`/${post.slug.current}`} key={post._id}>
          <article>
            <h1>{post.title}</h1>
            <Image
              src={urlFor(post?.mainImage).url()}
              alt={post.mainImage.alt}
              width={600}
              height={600}
            />
            <p>{post.metaDescription}</p>
          </article>
        </Link>
      ))}
    </>
  );
}
