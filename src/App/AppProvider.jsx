import React from 'react';
import './App.css';
import _ from 'lodash';
import moment from 'moment';
import cc from 'cryptocompare';

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// Default State
			page: 'dashboard',
			favorites: ['ETH', 'BTC', 'XMR', 'DOGE'],
			timeInterval: 'months',
			// From Local Storage
			...this.savedSettings(),
			// React Context Helpers
			setPage: this.setPage,
			isInFavorites: this.isInFavorites,
			addCoin: this.addCoin,
			removeCoin: this.removeCoin,
			filterCoins: this.filterCoins,
			confirmFavorites: this.confirmFavorites,
			setCurrentFavorite: this.setCurrentFavorite,
			setFilteredCoins: this.setFilteredCoins,
			changeChartSelect: this.changeChartSelect
		};
	}

	changeChartSelect = value => {
		this.setState(
			{
				timeInterval: value,
				historical: null
			},
			this.fetchHistorical
		);
	};

	componentDidMount = () => {
		this.fetchHistorical();
		this.fetchCoins();
		this.fetchPrices();
	};

	validateFavorites = coinList => {
		const validatedFavorites = [];
		this.state.favorites.forEach(favorite => {
			if (coinList[favorite]) {
				validatedFavorites.push(favorite);
			}
		});
		return validatedFavorites;
	};

	setCurrentFavorite = sym => {
		this.setState(
			{
				currentFavorite: sym,
				historical: null
			},
			this.fetchHistorical
		);
		localStorage.setItem(
			'cryptoDash',
			JSON.stringify({
				...JSON.parse(localStorage.getItem('cryptoDash')),
				currentFavorite: sym
			})
		);
	};

	fetchCoins = async () => {
		const coinList = (await cc.coinList()).Data;
		this.setState({
			coinList,
			favorites: this.validateFavorites(coinList)
		});
	};

	fetchPrices = async () => {
		if (this.state.firstVisit) return;
		const prices = await this.prices();
		this.setState({
			prices
		});
	};

	fetchHistorical = async () => {
		if (this.state.firstVisit) return;
		const results = await this.historical();
		const historical = [
			{
				name: this.state.currentFavorite,
				data: results.map((ticker, index) => [
					moment()
						.subtract({
							[this.state.timeInterval]: TIME_UNITS - index
						})
						.valueOf(),
					ticker.USD
				])
			}
		];
		this.setState({
			historical
		});
	};

	historical = () => {
		const promises = [];
		for (let units = TIME_UNITS; units > 0; units--) {
			promises.push(
				cc.priceHistorical(
					this.state.currentFavorite,
					['USD'],
					moment()
						.subtract({
							[this.state.timeInterval]: units
						})
						.toDate()
				)
			);
		}
		return Promise.all(promises);
	};

	prices = async () => {
		const returnData = [];
		for (let i = 0; i < this.state.favorites.length; i++) {
			try {
				const priceData = await cc.priceFull(this.state.favorites[i], 'USD');
				returnData.push(priceData);
			} catch (e) {
				console.warn('Fetch price error: ', e);
			}
		}
		return returnData;
	};

	setPage = page =>
		this.setState({
			page
		});

	confirmFavorites = () => {
		const currentFavorite = this.state.favorites[0];
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

	isInFavorites = key => _.includes(this.state.favorites, key);

	setFilteredCoins = filteredCoins =>
		this.setState({
			filteredCoins
		});

	savedSettings = () => {
		const cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
		if (!cryptoDashData) {
			return {
				firstVisit: true,
				page: 'settings'
			};
		}
		const { favorites, currentFavorite } = cryptoDashData;
		return {
			favorites,
			currentFavorite
		};
	};

	render() {
		return <AppContext.Provider value={this.state}> {this.props.children} </AppContext.Provider>;
	}
}
