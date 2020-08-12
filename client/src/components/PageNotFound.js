import React from "react";
import { IllustratedMessage, Heading, Content } from "@adobe/react-spectrum";

// import NotFound from "@spectrum-icons/illustrations/NotFound";

const PageNotFound = () => (
  <IllustratedMessage>
    <Heading>Error 404: Page not found</Heading>
    <Content>
      This page isn't available. Try checking the URL or visit a different page.
    </Content>
  </IllustratedMessage>
);

export default PageNotFound;
