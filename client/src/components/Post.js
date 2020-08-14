import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  getPost,
  createComment,
  likePost,
  deletePost,
  getPosts,
  deleteComment,
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
  const [commentID, setCommentID] = useState("");
  const [post, setPost] = useState([]);
  const [body, setBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const [getpost, { loading }] = useLazyQuery(getPost, {
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
      console.log(data);
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
    //  refetchQueries: ["getPosts"],
    onCompleted: (data) => {
      console.log(data);
      history.push("/home");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  let [commentDelete] = useMutation(deleteComment, {
    variables: { postId, commentID },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    onCompleted: (data) => {
      console.log(data);
      setPost(data.deleteComment);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    getpost();
  }, []);

  return (
    <div className="post-page">
      {loading && "Loadinggg"}
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
              post.comments.map(({ body, id }) => (
                <span
                  onClick={() => {
                    setCommentID(id);
                    commentDelete();
                  }}
                >
                  {body}
                </span>
              ))}
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
