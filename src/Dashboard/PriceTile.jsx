import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinHeaderGridStyled, CoinSymbol } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/AppProvider';

const numberFormat = number => +`${number}`.slice(0, 7);

const ChangePct = styled.div`
	color: green;
	${props =>
		props.red &&
		css`
			color: red;
		`};
`;

const TickerPrice = styled.div`
	${fontSizeBig};
`;

const PriceTileStyled = styled(SelectableTile)`
	${props =>
		props.currentFavorite &&
		css`
			${greenBoxShadow}
			&:hover {
				pointer-events: none;
			}
		`}
`;

const PriceTileCompactStyled = styled(PriceTileStyled)`
	${fontSize3}
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(3, 1fr);
	justify-items: right;
`;

function PriceTile({ sym, data, currentFavorite, onClick }) {
	if (!data) {
		return <SelectableTile> No data for {sym} </SelectableTile>;
	}
	return (
		<PriceTileStyled currentFavorite={currentFavorite} onClick={onClick}>
			<CoinHeaderGridStyled>
				<div> {sym}</div>
				<CoinSymbol>
					<ChangePct red={data.CHANGEPCT24HOUR < 0}>{numberFormat(data.CHANGEPCT24HOUR)}%</ChangePct>
				</CoinSymbol>
			</CoinHeaderGridStyled>
			<TickerPrice>${numberFormat(data.PRICE)} </TickerPrice>
		</PriceTileStyled>
	);
}

function PriceTileCompact({ sym, data, currentFavorite, onClick }) {
	if (!data) {
		return <SelectableTile> No data for {sym} </SelectableTile>;
	}
	return (
		<PriceTileCompactStyled currentFavorite={currentFavorite} onClick={onClick}>
			<div style={{ justifySelf: 'left' }}> {sym}</div>
			<CoinSymbol>
				<ChangePct red={data.CHANGEPCT24HOUR < 0}>{numberFormat(data.CHANGEPCT24HOUR)}%</ChangePct>
			</CoinSymbol>
			<div>${numberFormat(data.PRICE)} </div>
		</PriceTileCompactStyled>
	);
}

export default function({ price, index }) {
	return (
		<AppContext.Consumer>
			{({ currentFavorite, setCurrentFavorite }) => {
				const TileClass = index < 5 ? PriceTile : PriceTileCompact;
				const sym = Object.keys(price)[0];
				const data = price[sym].USD;
				if (!data) {
					return <SelectableTile> No data for {sym} </SelectableTile>;
				}
				return (
					<TileClass
						currentFavorite={sym === currentFavorite}
						onClick={() => setCurrentFavorite(sym)}
						sym={sym}
						data={data}
					/>
				);
			}}
		</AppContext.Consumer>
	);
}
