import React from 'react';
import cc from 'cryptocompare';

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSetting(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites,
    };
  }

  componentDidMount() {
    this.fetchCoins();
  }

  setPage = page => this.setState({page});


  async fetchCoins() {
    const coinList = (await cc.coinList()).Data;
    this.setState(coinList);
  }

  confirmFavorites() {
    this.setState({
      firstVisit: false,
      page: 'dashboard',
    });
    localStorage.setItem('crytoDash', JSON.stringify({
      test: 'hello',
    }));
  }

  savedSetting() {
    let crytoDashData = JSON.parse(localStorage.getItem('crytoData'));
    if (!crytoDashData) {
      return { page: 'settings', firstVisit: true };
    }
    return {};
  }


  render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>;
  }
}
