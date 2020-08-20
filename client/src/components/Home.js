import React, { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import CreatePost from "./CreatePost";
import { useQuery } from "@apollo/react-hooks";
import { getPosts } from "../queries";
import { useHistory } from "react-router-dom";

import viewArrow from "../assets/icons/view-arrow.svg";
import Loader from "./Loader";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { data, loading } = useQuery(getPosts, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
      setPosts(data.getPosts);
    },
    onError: (error) => {
      toast.error("Could not fetch posts, Please try again", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    },
  });
  //   console.log(posts);

  return (
    <section className="home">
      {loading && <Loader />}
      {/* <CreatePost /> */}
      {posts.map(({ username, body, id, createdAt }) => (
        <div className="card">
          <div className="info">
            <p style={{ fontSize: "1.65rem", padding: "1.3rem" }}>{body}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <p>{username}</p>
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="action" onClick={() => history.push(`/home/${id}`)}>
            <img src={viewArrow} alt="View post" className="icon" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Home;
