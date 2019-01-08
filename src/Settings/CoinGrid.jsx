import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-gap: 15px;
	margin-top: 40px;
`;

function getLowerSectionCoins(coinList, filteredCoins) {
	return (filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0, 100);
}

function getCoinsToDisplay(coinList, topSection, favorite, filterCoins) {
	return topSection ? favorite : getLowerSectionCoins(coinList, filterCoins);
}

export default function({ topSection }) {
	return (
		<AppContext.Consumer>
			{({ coinList, favorites, filteredCoins }) => {
				// console.log(coinList);
				if (coinList) {
					return (
						<CoinGridStyled>
							{getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => (
								<CoinTile key={coinKey} coinKey={coinKey} topSection={topSection} />
							))}
						</CoinGridStyled>
					);
				}
				return <div>Loading</div>;
			}}
		</AppContext.Consumer>
	);
}
