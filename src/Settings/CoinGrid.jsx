import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {Tile} from '../Shared/Tile';

export const CoinGridStyled = styled.div`
    display: grid;
`
export default function (){  
    return <AppContext.Consumer>
        {({coinList}) => <CoinGridStyled>
            {Object.keys(coinList).map(coinKey =>
                <div> {coinKey} </div>    
            )}
        </CoinGridStyled>}
    </AppContext.Consumer>
} 