export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text in Post",
      type: "string",
    },
    {
      name: "blockPost",
      title: "Block Post",
      description: "ADMIN Controls: Toogle if Post is deemed inappropriate",
      type: "boolean",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Profile image",
      type: "string",
    },
    {
      name: "image",
      title: "Post Image",
      type: "string",
    },
  ],
};
