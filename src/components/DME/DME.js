import React from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';
import styles from './DME.styl';

const DME = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.DME}>
		DME
	</div>);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(DME);
