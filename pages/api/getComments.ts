// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";
import { Comment } from "../../typings";

const commentQuery = groq`*[_type == 'comment' &&  references(*[_type == "post" && _id == $postId]._id)] | order(_createdAt desc)`;

type Data = Comment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comments: Comment[] = await sanityClient.fetch(commentQuery, {
    postId: req.query.postId,
  });
  res.status(200).json(comments);
}
