import React from 'react';
import {AppContext} from '../App/AppProvider';
import {SelectableTile, DisabledTile, DeletableTile} from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
	return topSection ? () => {
		removeCoin(coinKey)
	} : () => {
		addCoin(coinKey)
	}
}


export default function({coinKey, topSection}){
    return <AppContext.Consumer>
        {({isInFavorites, coinList, addCoin, removeCoin}) => {
            const coin = coinList[coinKey];
            // console.log(coin);
            // console.log(topSection);
            
            let TileClass = SelectableTile;
            if(topSection) {
                TileClass = DeletableTile;
            }
            return <TileClass onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}>
                <CoinHeaderGrid topSection={topSection} name={coin.Name} symbol={coin.Symbol}/>
                <CoinImage coin={coin}/>
            </TileClass>
        }}
    </AppContext.Consumer>
}