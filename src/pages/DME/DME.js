import React from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';
import styles from './DME.styl';
import { NavLink } from 'react-router-dom'

const DME = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.DME}>
		<span>DME</span>

		<NavLink to="/SVO">to SVO</NavLink>
	</div>);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(DME);
