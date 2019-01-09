import React from "react";
import styled from "styled-components";
import _ from "lodash";
import fuzzy from "fuzzy";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
`;
const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
    border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
  // Get all the coin symbols;
  const coinSymbols = Object.keys(coinList);
  // Get all the coin names, map symbol to name;
  const coinNames = coinSymbols.map(sym => coinList[sym].Name);
  const allStringToSearch = coinSymbols.concat(coinNames);
  const fuzzyResults = fuzzy
    .filter(inputValue, allStringToSearch, {})
    .map(result => result.string);

  console.log(allStringToSearch);
  // console.log(fuzzyResults);
  const filteredCoins = _.pickBy(coinList, (result, symKey) => {
    const coinName = result.Name;
    return (
      _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
    );
  });
  setFilteredCoins(filteredCoins);
}, 500);

function filterCoins(e, setFilteredCoins, coinList) {
  const inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  console.log(inputValue);
  handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput
            onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}
