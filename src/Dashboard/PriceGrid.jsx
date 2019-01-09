import React from 'react';
import { AppContext } from '../App/AppProvider';
import { CoinGridStyled } from '../Settings/CoinGrid';
import PriceTile from './PriceTile';

export default function() {
	return (
		<AppContext.Consumer>
			{({ prices }) => (
				<CoinGridStyled>
					{prices.map((price, index) => (
						<PriceTile key={index} price={price} index={index} />
					))}
				</CoinGridStyled>
			)}
		</AppContext.Consumer>
	);
}
