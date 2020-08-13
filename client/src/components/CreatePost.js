import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { createPost } from "../queries";
import { useHistory } from "react-router-dom";
import {
  Flex,
  TextArea,
  Heading,
  ProgressCircle,
  Dialog,
  Button,
} from "@adobe/react-spectrum";

const CreatePost = () => {
  const history = useHistory();
  const [body, setBody] = useState("");
  let [newPost, { called, loading, data, error }] = useMutation(createPost, {
    variables: { body },
    context: {
      headers: { authorization: localStorage.getItem("token") },
    },
    pollInterval: 0,
    onCompleted: () => {
      history.push("/home");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="size-50"
      alignSelf="flex-start"
      UNSAFE_className="neumorphic"
    >
      {loading && (
        <Dialog position="fixed" top="45%" left="45%" zIndex="101">
          <ProgressCircle size="L" aria-label="Loading…" isIndeterminate />
        </Dialog>
      )}
      <Heading level="4">Share your thoughts with us.</Heading>
      <TextArea
        width="100%"
        //   height="150px"
        label=""
        name="Body"
        value={body}
        onChange={setBody}
        placeholder="Let us know what's on your mind "
      />
      <Button variant="cta" onClick={newPost}>
        Share
      </Button>
      <br />
    </Flex>
  );
};

export default CreatePost;
