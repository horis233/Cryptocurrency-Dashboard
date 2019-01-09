import React from 'react';
import highchartsConfig from './HighchartsConfig';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import theme from './HighchartsTheme';
// import ChartSelect from './ChartSelect';

const ReactHighcharts = require('react-highcharts');

ReactHighcharts.Highcharts.setOptions(theme);

export default function() {
	return (
		<AppContext.Consumer>
			{({ changeChartSelect, historical }) => (
				<Tile>
					<ChartSelect defaultValue="months" onChange={e => changeChartSelect(e.target.value)}>
						<option value="days">Days</option>
						<option value="weeks">Weeks</option>
						<option value="months">Months</option>
					</ChartSelect>
					{historical ? (
						<ReactHighcharts config={highchartsConfig(historical)} />
					) : (
						<div> Loading historical data </div>
					)}
				</Tile>
			)}
		</AppContext.Consumer>
	);
}
