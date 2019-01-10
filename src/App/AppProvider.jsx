/* eslint react/no-unused-state: 0 */

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
		const { favorites } = this.state;
		const validatedFavorites = [];
		favorites.forEach(favorite => {
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
		const { firstVisit } = this.state;
		if (firstVisit) return;
		const prices = await this.prices();
		this.setState({
			prices
		});
	};

	fetchHistorical = async () => {
		const { currentFavorite, timeInterval, firstVisit } = this.state;
		if (firstVisit) return;
		const results = await this.historical();
		const historical = [
			{
				name: currentFavorite,
				data: results.map((ticker, index) => [
					moment()
						.subtract({
							[timeInterval]: TIME_UNITS - index
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
		const { currentFavorite, timeInterval } = this.state;
		for (let units = TIME_UNITS; units > 0; units--) {
			promises.push(
				cc.priceHistorical(
					currentFavorite,
					['USD'],
					moment()
						.subtract({
							[timeInterval]: units
						})
						.toDate()
				)
			);
		}
		return Promise.all(promises);
	};

	prices = async () => {
		const { favorites } = this.state;
		const returnData = [];
		for (let i = 0; i < favorites.length; i++) {
			try {
				returnData.push(cc.priceFull(favorites[i], 'USD'));
			} catch (e) {
				console.warn('Fetch price error: ', e);
			}
		}
		const result = await Promise.all(returnData);
		return result;
	};

	setPage = page =>
		this.setState({
			page
		});

	confirmFavorites = () => {
		const { favorites } = this.state;
		const currentFavorite = favorites[0];
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
				favorites,
				currentFavorite
			})
		);
	};

	addCoin = key => {
		const { favorites } = this.state;
		const addedFavorites = [...favorites];
		if (addedFavorites.length < MAX_FAVORITES) {
			addedFavorites.push(key);
			this.setState({ favorites: addedFavorites });
		}
	};

	removeCoin = key => {
		const { favorites } = this.state;
		const deletedFavorites = [...favorites];
		this.setState({
			favorites: _.pull(deletedFavorites, key)
		});
	};

	isInFavorites = key => {
		const { favorites } = this.state;
		return _.includes(favorites, key);
	};

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
		const { children } = this.props;
		return <AppContext.Provider value={this.state}> {children} </AppContext.Provider>;
	}
}
