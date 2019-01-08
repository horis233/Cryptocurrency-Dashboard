import React from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';

const MAX_FAVORITES = 10

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['ETH', 'BTC', 'XMR', 'DOGE'],
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      ...this.savedSettings(),
      setPage: this.setPage,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

  setPage = page => this.setState({page});

  setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard',
        prices: null,
        currentFavorite,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({favorites});
    }
  };
  
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({favorites: _.pull(favorites, key)});
  };

  fetchCoins = async() => {
    const coinList = (await cc.coinList()).Data;
    //console.log(coinList);
    this.setState({coinList: coinList});
  }

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard',
      }
    );
    localStorage.setItem(
      'cryptoDash',
      JSON.stringify({
        favorites: this.state.favorites,
      })
    );
  };

  savedSettings = () => {
    let crytoDashData = JSON.parse(localStorage.getItem('crytoData'));
    if (!crytoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    return {crytoDashData};
  }

  isInFavorites = key => _.includes(this.state.favorites, key);

  render() {
    // console.log(this.props.children);
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>;
  }
}
