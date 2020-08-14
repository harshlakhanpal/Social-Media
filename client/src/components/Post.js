import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getPost,
  createComment,
  likePost,
  deletePost,
  getPosts,
} from "../queries";
import { useParams, useHistory } from "react-router-dom";
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
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
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

  let [newComment] = useMutation(createComment, {
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

  let [toggleLike] = useMutation(likePost, {
    variables: { postId },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    onCompleted: (data) => {
      setPost(data.likePost);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  let [postDelete] = useMutation(deletePost, {
    variables: { postId },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    refetchQueries: ["getPosts"],
    onCompleted: (data) => {
      console.log(data);
      history.push("/home");
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
            <div onClick={toggleLike}>
              <p>{post.body}</p>
              <p>{post.username}</p>
              <p>{moment(post.createdAt).fromNow()}</p>
              {user && user.username === post.username && (
                <span onClick={postDelete}>Delete</span>
              )}
            </div>
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
