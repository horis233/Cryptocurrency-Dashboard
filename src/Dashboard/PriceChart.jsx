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
			{({ historical }) => (
				<Tile>
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
