import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/react-hooks";
import { createPost, getPosts } from "../queries";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";

const CreatePost = () => {
  const history = useHistory();
  const [body, setBody] = useState("");
  let [newPost, { called, loading, data, error }] = useMutation(createPost, {
    variables: { body },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    //  update(proxy, result) {
    //    const data = proxy.readQuery({
    //      query: getPosts,
    //    });
    //    console.log(data);
    //    data.getPosts.push(result.data.createPost);
    //    proxy.writeQuery({ query: getPosts, data });
    //  },
    //  refetchQueries: ["getPosts"],
    //  awaitRefetchQueries: true,
    //  pollInterval: 0,
    onCompleted: () => {
      history.push("/home");
      toast.success("Post created successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    },
    onError: (error) => {
      console.log(error.graphQLErrors);
      toast.error("Something went wrong, Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    },
  });
  return (
    <div className="create-post">
      {loading && <Loader />}
      <h1>Share your thoughts with us</h1>
      <textarea
        className="input"
        style={{ marginBottom: "0" }}
        rows="5"
        name="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Let us know what's on your mind "
      />
      <button className="btn" onClick={newPost}>
        Share
      </button>
    </div>
  );
};

export default CreatePost;
