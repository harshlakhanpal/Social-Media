import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { getPosts } from "../queries";
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
  const { loading } = useQuery(getPosts, {
    onCompleted: (data) => {
      console.log(data);
      setPosts(data.getPosts);
    },
  });
  console.log(posts);
  return (
    <View width="100%" height="100%">
      {loading && (
        <Dialog position="fixed" top="45%" left="45%">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      {posts.map(({ username, body }) => (
        <View
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          width="80%"
          margin="auto"
          marginTop="15px"
        >
          <Content>{body}</Content>
          <Text>{username}</Text>
        </View>
      ))}
    </View>
  );
};

export default Home;
