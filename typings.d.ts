export interface Post extends PostBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "post";
  _updatedAt: string;
  blockPost: boolean;
}

export type PostBody = {
  image?: string;
  profileImage: string;
  text: string;
  username: string;
};
