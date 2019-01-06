import React from 'react';
import styled from 'styled-components';

export const CoinHeaderGridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`
export const CoinSymbol = styled.div`
    justify-self: right;
`
export default function(coin){
    // console.log(coin);
    return <CoinHeaderGridStyled>
        <div> {coin.name} </div>
        <CoinSymbol> {coin.symbol} </CoinSymbol>
    </CoinHeaderGridStyled> 
}