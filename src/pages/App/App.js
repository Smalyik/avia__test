import React from 'react';
import styles from './App.styl';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App = ({ name, setName, fetchName }) => {
	return (
	<div className={styles.App}>
		<Link to="/VKO">VKO</Link>
		<Link to="/DME">DME</Link>
		<Link to="/SVO">SVO</Link>
	</div>);
};

export default App;
