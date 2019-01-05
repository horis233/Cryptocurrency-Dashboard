import React from 'react';
import cc from 'cryptocompare';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

  setPage = page => this.setState({page});


  fetchCoins = async() => {
    const coinList = (await cc.coinList()).Data;
    //console.log(coinList);
    this.setState(
      coinList
    );
  }

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard',
    });
    localStorage.setItem('crytoDash', JSON.stringify({
      test: 'hello',
    }));
  }

  savedSettings = () => {
    let crytoDashData = JSON.parse(localStorage.getItem('crytoData'));
    if (!crytoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    return {};
  }


  render() {
    // console.log(this.props.children);
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>;
  }
}
