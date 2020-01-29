import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Root from './Root';
import styles from './styles/common.styl';
import FlightInfo from './components/FlightInfo/FlightInfo';
const App = lazy(() => import('./pages/App/App'));
const VKO = lazy(() => import('./pages/VKO/VKO'));
const DME = lazy(() => import('./pages/DME/DME'));
const SVO = lazy(() => import('./pages/SVO/SVO'));

ReactDOM.render(
	<MuiPickersUtilsProvider utils={MomentUtils}>
		<Root>
			<Router>
				<Suspense fallback={<div>loading...</div>}>
					<header className={styles.header}>
						<div className={styles.navbar}>
							<div className={styles.link}>
								<Link to="/VKO">Внуково</Link>
							</div>
							<div className={styles.link}>
								<Link to="/DME">Домодедово</Link>
							</div>
							<div className={styles.link}>
								<Link to="/SVO">Шереметьево</Link>
							</div>
						</div>
					</header>
					<Switch>
						<Route path="/VKO">
							<VKO />
						</Route>
						<Route path="/DME">
							<DME />
						</Route>
						<Route path="/SVO">
							<SVO />
						</Route>
						<Route path="/flights/:info" name="flights">
							<FlightInfo />
						</Route>
						<Route path="/">
							<App />
						</Route>	
					</Switch>
					<footer className={styles.footer}>
						<div className={styles.copyright}>Ilysha (c)</div>
					</footer>
				</Suspense>
			</Router>
		</Root>
	</MuiPickersUtilsProvider>,
	document.getElementById('root')
);
