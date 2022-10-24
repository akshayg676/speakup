// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "../../typings";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";

const query = groq`
  *[_type == "post" && !blockPost] | order(_createdAt desc)
  `;

type Data = {
  posts: Post[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts: Post[] = await sanityClient.fetch(query);
  res.status(200).json({ posts });
}
