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
    <section className="post-page">
      {loading && "Loadinggg"}
      <div>
        {post && (
          <>
            <div className="card">
              <div className="content">{post.body}</div>
              <div className="actions">
                {user && user.username === post.username && (
                  <span onClick={postDelete}>Del</span>
                )}
                <span className="like" onClick={toggleLike}>
                  Like
                </span>
                <p>{moment(post.createdAt).format("DD-MM-YY")}</p>
              </div>
            </div>
            <p style={{ textAlign: "end" }}>Posted by {post.username}</p>
            <div style={{ position: "relative" }}>
              <textarea
                className="input"
                //   style={{ position: "relative" }}
                rows="2"
                placeholder="Comment here."
                value={body}
                onChange={handleBodyChange}
              ></textarea>
              <button
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                //  className="input"
                onClick={newComment}
              >
                comment
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
                      Del
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
