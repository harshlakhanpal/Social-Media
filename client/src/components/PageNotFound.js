import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin-top: 50px;
  opacity: 0.6;
`;

const PageNotFound = () => (
  <section>
    <Container>404: Page Not Found</Container>
  </section>
);

export default PageNotFound;
