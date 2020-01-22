import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';

import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';

import styles from './SVO.styl';

const SVO = prosp => {
	const [departure, setDeparture] = useState(false)

	return (
		<div className={styles.main}>
			{/* // TODO: SORT Component */}
			<Controls />
			<FlightCard
				flightNumber={`1`}
				transporterName={`2`}
				date={Date.parse(Date.now())}
				country={`Russia`}
				terminal={`3`}
			/>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(SVO);
