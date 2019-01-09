import React from 'react'
import {Tile} from "../Shared/Tile"
import {AppContext} from "../App/AppProvider"
import CoinImage from '../Shared/CoinImage'

export default function () {
  return (
    <AppContext.Consumer>
      {({coinList, currentFavorite}) =>
        <Tile>
          <h2 style={{textAlign: "center"}}>{coinList[currentFavorite].CoinName}</h2>
          <CoinImage style={{height: "200px", display: "block", margin: "auto"}} coin={coinList[currentFavorite]}/>
        </Tile>
      }
    </AppContext.Consumer>
  )
}