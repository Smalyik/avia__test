import React from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';
import FlightCard from '../FlightCard/FlightCard'

import styles from './SVO.styl';

const SVO = ({ name, setName, fetchName }) => {
	return (
	<div className='main'>
		{/* // TODO: SORT Component */}
		<FlightCard 
			flightNumber={`1`}
			transporterName={`2`}
			departureDate={`22.01.2020, 23:00`}
			departureCountry={`Russia`}
			departureTerminal={`3`}
			arrivalDate={`23.01.2020, 03:00`}
			arrivalCountry={`United States`}
			arrivalTerminal={`8`}
		/>
	</div>);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(SVO);
