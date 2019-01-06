import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectableTile} from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

export default function(coinKey){
    return <AppContext.Consumer>
        {(coinList) => {
            const coin = coinList.coinList[coinKey.coinKey];
            // console.log(coin);
            const TileClass = SelectableTile;
            return <TileClass>
                <CoinHeaderGrid name={coin.Name} symbol={coin.Symbol}/>
                <CoinImage coin={coin}/>
            </TileClass>
        }}
    </AppContext.Consumer>
}