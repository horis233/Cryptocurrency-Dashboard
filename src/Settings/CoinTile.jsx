import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectableTile, DisabledTile, DeletableTile} from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

export default function({coinKey, topSection}){
    return <AppContext.Consumer>
        {(coinList) => {
            const coin = coinList.coinList[coinKey];
            // console.log(coin);
            console.log(topSection);
            
            let TileClass = SelectableTile;
            if(topSection) {
                TileClass = DeletableTile;
            }
            return <TileClass>
                <CoinHeaderGrid topSection={topSection} name={coin.Name} symbol={coin.Symbol}/>
                <CoinImage coin={coin}/>
            </TileClass>
        }}
    </AppContext.Consumer>
}