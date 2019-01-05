import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectableTile} from '../Shared/Tile';

export default function(coinKey){
    return <AppContext.Consumer>
        {(coinList) => {
            const coin = coinList.coinList[coinKey.coinKey];
            console.log(coin);
            return <SelectableTile>
                <div>{coin.Name}</div>
            </SelectableTile>
        }}
    </AppContext.Consumer>
}