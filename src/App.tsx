import { Routes, Route } from 'react-router-dom';
import '../src/assets/styles/index.scss';
import Navbar from './components/NavBar';
import Home from './components/Home/Home';
import CoinInfo from './components/CoinInfo';

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/coin" element={<CoinInfo />}>
					<Route path=":coinId" element={<CoinInfo />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
