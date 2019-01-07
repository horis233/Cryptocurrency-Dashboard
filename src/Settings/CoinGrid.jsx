import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function getCoinsToDisplay(coinList, topSection, favorite) {
    return topSection? favorite : Object.keys(coinList).slice(0, 20);
}

  
export default function ({topSection}){  
    return (
        <AppContext.Consumer>
          {({coinList, favorites}) => {
            // console.log(coinList);
            if(coinList){
              let coinMap = new Map();
              for(let k of Object.keys(coinList)){
              coinMap.set(k, coinList[k]);
            }
            return <CoinGridStyled>
            {getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => (
            <CoinTile key = {coinKey} coinKey={coinKey} topSection={topSection}/>
            ))}
            </CoinGridStyled>
            }
            
            }
          }
        </AppContext.Consumer>
    )
} 