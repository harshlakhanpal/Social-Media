import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getPost,
  createComment,
  likePost,
  deletePost,
  deleteComment,
} from "../queries";
import del from "../assets/icons/delete.svg";
import emptyHeart from "../assets/icons/heart.svg";
import filledHeart from "../assets/icons/heart-filled.svg";

import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";

const Post = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  let { postId } = useParams();
  const [likeCount, setLikeCount] = useState(0);
  const [postLikes, setPostLikes] = useState([]);
  const [commentID, setCommentID] = useState("");
  const [post, setPost] = useState({});
  const [body, setBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const { loading } = useQuery(getPost, {
    variables: { postId },
    onCompleted: async (data) => {
      console.log(data);

      await setPost(data.getPost);
      await setPostLikes(data.getPost.likes);
      await setLikeCount(data.getPost.likes.length);
    },
  });

  let [newComment] = useMutation(createComment, {
    variables: { body, postId },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    onCompleted: async (data) => {
      await setPost(data.createComment);
      await setBody("");
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
    onCompleted: async (data) => {
      console.log(data);
      await setLikeCount(data.likePost.likes.length);
      await setPostLikes(data.likePost.likes);
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

  //   useEffect(() => {
  //     getpost();
  //   }, []);

  console.log(commentID);
  return (
    <section className="post-page">
      {loading && <Loader />}
      <div>
        {post && (
          <>
            <div className="card">
              <div className="card-content">
                <div style={{ fontSize: "1.65rem" }}>{post.body}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                  }}
                >
                  <p style={{ textAlign: "end" }}>
                    {`Posted by ${post.username}`}
                  </p>
                  <p>
                    {likeCount === 0 || likeCount > 1
                      ? `Liked by ${likeCount} users.`
                      : `Liked by ${likeCount} user.`}
                  </p>
                </div>
              </div>
              <div className="actions">
                {user && user.username === post.username && (
                  <span onClick={postDelete}>
                    <img src={del} alt="Delete Post" className="icon" />
                  </span>
                )}
                <span className="like" onClick={toggleLike}>
                  {true &&
                  postLikes.some((one) => one.username === user.username) ? (
                    <img
                      src={filledHeart}
                      alt="Like/Unlike Post"
                      className="icon"
                    />
                  ) : (
                    <img
                      src={emptyHeart}
                      alt="Like/Unlike Post"
                      className="icon"
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="textarea-container">
              <textarea
                className="input"
                style={{ marginBottom: "0" }}
                rows="4"
                placeholder="Comment here."
                value={body}
                onChange={handleBodyChange}
              ></textarea>
              <button className="btn" onClick={newComment}>
                Comment
              </button>
            </div>
            {post.comments &&
              post.comments.length > 0 &&
              post.comments.map(({ body, id, username }) => (
                <div className="comment">
                  <span style={{ wordBreak: "break-all" }}>{body}</span>
                  {user && user.username === username && (
                    <span
                      style={{ alignSelf: "flex-end" }}
                      onClick={async () => {
                        await setCommentID(id);
                        commentDelete();
                      }}
                    >
                      <img src={del} alt="Delete comment" className="icon" />
                    </span>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Post;
