import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

function getCoinsToDisplay(coinList, topSection) {
    return Object.keys(coinList).slice(0, topSection ? 5 : 20);
}

  
export default function ({topSection}){  
    return (
        <AppContext.Consumer>
          {(coinList) => {
            console.log(coinList.coinList);
            if(coinList.coinList){
              let coinMap = new Map();
              for(let k of Object.keys(coinList.coinList)){
              coinMap.set(k, coinList.coinList[k]);
            }
            return <CoinGridStyled>
            {getCoinsToDisplay(coinList.coinList, topSection).map(coinKey => (
            <CoinTile key = {coinKey} coinKey={coinKey} topSection={topSection}/>
            ))}
            </CoinGridStyled>
            }
            
            }
          }
        </AppContext.Consumer>
    )
} 