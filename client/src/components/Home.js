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
  console.log(data);
  return (
    <section className="home">
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      {/* <CreatePost /> */}
      {posts.map(({ username, body, id, createdAt }) => (
        <div className="card" onClick={() => history.push(`/home/${id}`)}>
          <div className="card-header">{username} says</div>
          <div className="card-body">{body}</div>
          <Text>{moment(createdAt).fromNow()}</Text>
        </div>
      ))}
    </section>
  );
};

export default Home;
