import React from "react";
import styled from "styled-components";
import CloseCircle from "@spectrum-icons/workflow/CloseCircle";

import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/app/actions";

const DrawerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: lightgrey;
  z-index: 100;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Drawer = () => {
  const visible = useSelector((state) => state.app.drawerVisibility);
  const dispatch = useDispatch();

  console.log(visible);
  return (
    <>
      {visible ? (
        <DrawerContainer>
          <div>
            <span onClick={() => dispatch(toggleDrawer())}>
              <CloseCircle aria-label="closecircle" size="S" />
            </span>
          </div>
        </DrawerContainer>
      ) : null}
    </>
  );
};

export default Drawer;
