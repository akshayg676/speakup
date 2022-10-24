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

export interface Comment extends CommentBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "comment";
  _updatedAt: string;
  post: {
    _ref: string;
    _type: "reference";
  };
}

export type CommentBody = {
  comment: string;
  postId: string;
  profileImg: string;
  username: string;
};
