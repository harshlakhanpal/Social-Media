import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import {
  getPost,
  createComment,
  likePost,
  deletePost,
  deleteComment,
} from "../queries";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

const Postcard = styled.div`
  background: yellow;
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 80%;
  .header {
    flex-basis: 10%;
    background: purple;
  }
`;

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
      setPost(data.deleteComment);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    getpost();
  }, []);

  console.log(commentID);
  return (
    <div className="post-page">
      {loading && "Loadinggg"}
      <Postcard className="post-card neumorphic">
        {post && (
          <>
            <div>
              <div className="header">{post.username} says </div>
              <div className="content">{post.body}</div>
              <p>{moment(post.createdAt).fromNow()}</p>
              {user && user.username === post.username && (
                <span onClick={postDelete}>Delete</span>
              )}
              <div className="like" onClick={toggleLike}>
                like
              </div>
            </div>
            {post.comments &&
              post.comments.length > 0 &&
              post.comments.map(({ body, id }) => (
                <span
                  onClick={async () => {
                    await setCommentID(id);
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
      </Postcard>
    </div>
  );
};

export default Post;
