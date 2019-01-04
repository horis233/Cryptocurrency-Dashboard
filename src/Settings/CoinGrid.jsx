import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {Tile} from '../Shared/Tile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  ${props =>
  props.count &&
  css`
      grid-template-columns: repeat(${props.count > 5 ? props.count : 5}, 1fr);
    `}
  grid-gap: 15px;
  margin-top: 40px;
`;

export default function (){  
    return <AppContext.Consumer>
        {(coinList) => <CoinGridStyled>
            {Object.keys(coinList).map(coinKey =>
                <div key = {coinKey} > {coinKey} </div>    
            )}
        </CoinGridStyled>}
    </AppContext.Consumer>
} 