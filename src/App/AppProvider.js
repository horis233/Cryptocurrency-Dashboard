import React from "react";
import cc from "cryptocompare";
import _ from "lodash";

const MAX_FAVORITES = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "dashboard",
            favorites: ["ETH", "BTC", "XMR", "DOGE"],
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
        this.fetchPrices();
    };

    setPage = page =>
        this.setState({
            page
        });

    setFilteredCoins = filteredCoins =>
        this.setState({
            filteredCoins
        });

    confirmFavorites = () => {
        const currentFavorite = this.state.favorites[0];
        this.setState({
                firstVisit: false,
                page: "dashboard",
                prices: null,
                currentFavorite,
            },
            () => {
                this.fetchPrices();
            }
        );
        localStorage.setItem(
            "cryptoDash",
            JSON.stringify({
                favorites: this.state.favorites,
                currentFavorite
            })
        );
    };

    addCoin = key => {
        const favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({
                favorites
            });
        }
    };

    removeCoin = key => {
        const favorites = [...this.state.favorites];
        this.setState({
            favorites: _.pull(favorites, key)
        });
    };

    fetchCoins = async() => {
        const coinList = (await cc.coinList()).Data;
        // console.log(coinList);
        this.setState({
            coinList
        });
    };

    fetchPrices = async() => {
        // if (this.state.firstVisit) return;
        const prices = await this.prices();
        this.setState({
            prices
        });
    };

    prices = async() => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {
                console.log(this.state.favorites[i]);
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch (e) {
                console.warn('Fetch price error: ', e);
            }
        }
        return returnData;
    };

    confirmFavorites = () => {
        const currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: "dashboard"
        });
        localStorage.setItem(
            "cryptoDash",
            JSON.stringify({
                favorites: this.state.favorites
            })
        );
    };

    savedSettings = () => {
        const crytoDashData = JSON.parse(localStorage.getItem("crytoData"));
        if (!crytoDashData) {
            return {
                page: "settings",
                firstVisit: true
            };
        }
        return {
            crytoDashData
        };
    };

    isInFavorites = key => _.includes(this.state.favorites, key);

    render() {
        // console.log(this.props.children);
        return ( <
            AppContext.Provider value = {
                this.state
            } > {
                " "
            } {
                this.props.children
            } {
                " "
            } <
            /AppContext.Provider>
        );
    }
}