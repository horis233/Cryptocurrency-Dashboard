import { fontSize1, greenBoxShadow, color3 } from "../Shared/Styles";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3}
  ${fontSize1}
  font-family: Exo 2, sans-serif;
  padding: 5px;
  &:hover {
    ${greenBoxShadow}
    cursor: pointer;
  }
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ confirmFavorites }) => (
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </CenterDiv>
      )}
    </AppContext.Consumer>
  );
}
