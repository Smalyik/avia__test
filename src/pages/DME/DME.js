import React from 'react';
import styles from './DME.styl';
import { NavLink } from 'react-router-dom'

const DME = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.DME}>
		<span>DME</span>

		<NavLink to="/SVO">to SVO</NavLink>
	</div>);
};

export default DME;
