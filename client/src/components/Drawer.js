import React from "react";
import styled from "styled-components";
import ArrowRight from "@spectrum-icons/workflow/ArrowRight";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDrawer } from "../store/app/actions";
import rightArrow from "../assets/icons/right-arrow.svg";

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
  const history = useHistory();
  const visible = useSelector((state) => state.app.drawerVisibility);
  const dispatch = useDispatch();

  console.log(visible);
  return (
    <>
      {visible ? (
        <DrawerContainer>
          <div>
            <span
              style={{ width: "100%", textAlign: "center" }}
              onClick={() => dispatch(toggleDrawer())}
            >
              <img src={rightArrow} alt="hide sidebar" className="icon" />
            </span>

            <div onClick={() => history.push("/home/create_post")}>Option1</div>
            <div>Option2</div>
            <div>Option3</div>
          </div>
        </DrawerContainer>
      ) : null}
    </>
  );
};

export default Drawer;
