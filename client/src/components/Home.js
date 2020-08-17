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
    <div style={{ width: "100%", height: "100%" }}>
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      {/* <CreatePost /> */}
      {posts.map(({ username, body, id, createdAt }) => (
        <div
          style={{
            borderWidth: "1px",
            borderColor: "dark",
            borderRadius: "medium",
            width: "80%",
            margin: "auto",
            marginTop: "15px",
          }}
        >
          <span onClick={() => history.push(`/home/${id}`)}>
            <Content>{body}</Content>
            <Text>{username}</Text>
            <Text>{moment(createdAt).fromNow()}</Text>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Home;
