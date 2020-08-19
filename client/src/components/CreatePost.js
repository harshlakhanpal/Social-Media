import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { createPost, getPosts } from "../queries";
import { useHistory } from "react-router-dom";

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
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  return (
    <div className="create-post">
      {loading && <p>Loadinggg</p>}
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
