import React, { useState } from "react";
import moment from "moment";
import CreatePost from "./CreatePost";
import { useQuery } from "@apollo/react-hooks";
import { getPosts } from "../queries";
import { useHistory } from "react-router-dom";
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
import viewArrow from "../assets/icons/view-arrow.svg";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { data, loading } = useQuery(getPosts, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log(data);
      setPosts(data.getPosts);
    },
  });
  //   console.log(posts);

  return (
    <section className="home">
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      {/* <CreatePost /> */}
      {posts.map(({ username, body, id, createdAt }) => (
        <div className="card">
          <div className="info">
            <p style={{ fontSize: "2rem", padding: "1.3rem" }}>{body}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
