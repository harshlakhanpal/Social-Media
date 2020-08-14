import React, { useState } from "react";
import moment from "moment";
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
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      {posts.map(({ username, body, id, createdAt }) => (
        <View
          elementType="div"
          borderWidth="thin"
          borderColor="dark"
          borderRadius="medium"
          width="80%"
          margin="auto"
          marginTop="15px"
        >
          <span onClick={() => history.push(`/home/${id}`)}>
            <Content>{body}</Content>
            <Text>{username}</Text>
            <Text>{moment(createdAt).fromNow()}</Text>
          </span>
        </View>
      ))}
    </View>
  );
};

export default Home;
