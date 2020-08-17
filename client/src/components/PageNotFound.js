import React from "react";
import { IllustratedMessage, Heading, Content } from "@adobe/react-spectrum";

import NotFound from "@spectrum-icons/illustrations/NotFound";

const PageNotFound = () => (
  <div>
    <NotFound />
    <h1>Error 404: Page not found</h1>
    <p>
      This page isn't available. Try checking the URL or visit a different page.
    </p>
  </div>
);

export default PageNotFound;
