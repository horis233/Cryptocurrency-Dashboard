import styled, {css} from 'styled-components'
import React from 'react'
import {AppContext} from "./AppProvider"

const Logo = styled.div`
  font-size: 1.5em;
`

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
  props.active &&
  css`
      text-shadow: 0px 0px 60px #03ff03;
    `};
  ${props => props.hidden && css`
    display: none;
  `}
`

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 140px 120px;
`

function toProperCase(lower) {
	return lower.charAt(0).toUpperCase() + lower.substr(1)
}

function ControlButton({name}) {
	return (
		<AppContext.Consumer>
  		{({firstVisit, setPage, page}) =>
  			<ControlButtonElem
  				onClick={() => setPage(name)}
  				active={page === name}
  				hidden={firstVisit && name === 'dashboard'}
  			>
  				{toProperCase(name)}
  			</ControlButtonElem>}
  	</AppContext.Consumer>
  )
}

export default function () {
  return (
    <Bar>
      <Logo>CryptoDash</Logo>
      <div/>
      <ControlButton name="dashboard"/>
      <ControlButton name="settings"/>
    </Bar>
  )
}