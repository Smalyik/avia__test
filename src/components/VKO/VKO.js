import React from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';
import styles from './VKO.styl';

const VKO = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.VKO}>
		VKO
	</div>);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(VKO);
