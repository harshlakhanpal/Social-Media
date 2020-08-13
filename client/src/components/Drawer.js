import React from "react";
import styled from "styled-components";
import StepForward from "@spectrum-icons/workflow/StepForward";

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
              <StepForward aria-label="stepforward" size="S" width="100%" />
            </span>

            <div>Option1</div>
            <div>Option2</div>
            <div>Option3</div>
          </div>
        </DrawerContainer>
      ) : null}
    </>
  );
};

export default Drawer;
