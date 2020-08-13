import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getPost } from "../queries";
import { useParams } from "react-router-dom";
import {
  Flex,
  TextField,
  Heading,
  Text,
  Content,
  View,
  Dialog,
  ProgressCircle,
} from "@adobe/react-spectrum";

const Post = () => {
  let { postId } = useParams();
  const [post, setPost] = useState([]);
  const { loading } = useQuery(getPost, {
    variables: { postId },
    onCompleted: (data) => {
      console.log(data);
      setPost(data.getPost);
    },
  });
  console.log(post);

  return <div>Single Post page</div>;
};

export default Post;
