import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getPost } from "../queries";
import { useParams } from "react-router-dom";
import moment from "moment";
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

  return (
    <div className="post-page">
      <div className="post-card">
        {post && (
          <>
            <p>{post.body}</p>
            <p>{post.username}</p>
            <p>{moment(post.createdAt).fromNow()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
