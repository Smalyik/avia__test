import React from 'react';
import { connect } from 'react-redux';
import { setName, fetchName } from '../../store/name/actions';
import styles from './App.styl';

const App = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.App}>
		App
	</div>);
};

const mapStateToProps = (state, ownProps) => {
	return {
		name: state.name,
	};
};

export default connect(mapStateToProps, { setName, fetchName })(App);
