import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getPost, createComment } from "../queries";
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
  const [body, setBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const { loading } = useQuery(getPost, {
    variables: { postId },
    onCompleted: (data) => {
      console.log(data);
      setPost(data.getPost);
    },
  });

  let [newComment, { called, data, error }] = useMutation(createComment, {
    variables: { body, postId },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    onCompleted: (data) => {
      setPost(data.createComment);
    },
    onError: (error) => {
      console.log("Error", error);
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
            {post.comments &&
              post.comments.length > 0 &&
              post.comments.map(({ body }) => <p>{body}</p>)}
          </>
        )}
        Comment:
        <textarea
          rows="10"
          className="shadow"
          placeholder=""
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <button onClick={newComment}>comment</button>
      </div>
    </div>
  );
};

export default Post;
