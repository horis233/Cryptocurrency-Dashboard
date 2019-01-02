import React from 'react';
import styled, {css}from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
    font-size: 1.5em;
`

const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 180px auto 120px 120px;
`
const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #FF6347;
    `}
`

function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name}) {
	return (
		<AppContext.Consumer>
  		{({setPage, page}) =>
  			<ControlButtonElem
  				onClick={() => setPage(name)}
  				active={page === name}
  			>
  				{toProperCase(name)}
  			</ControlButtonElem>}
  	</AppContext.Consumer>
  )
}

export default function(){
    return <Bar>
        <div> Cryptocurrency Dashboard</div>
        <div/>
        <ControlButton name="dashboard"/>
        <ControlButton name="settings"/>
    </Bar>
}