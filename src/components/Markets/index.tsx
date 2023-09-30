import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import sortOrderIcon from '../../assets/images/SortOrder.svg';
import { isMobile } from '../../utility/util';
interface CoinData {
	id: string;
	name: string;
	image: string;
	current_price: number;
	price_change_percentage_24h?: number;
	market_cap: number;
}

const MarketUpdate: FC = () => {
	const [data, setData] = useState<CoinData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [apiLoad, setApiLoad] = useState<boolean>(true);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false`;

	function numberWithCommas(x: number): string {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Error!');
				}
				const jsonData = await response.json();
				setData(jsonData);
				setApiLoad(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [url]);

	const toggleSortOrder = () => {
		setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
	};

	const sortedData = [...data];

	if (sortOrder === 'asc') {
		sortedData.sort((a, b) => a.current_price - b.current_price);
	} else {
		sortedData.sort((a, b) => b.current_price - a.current_price);
	}

	const paginationButtons: JSX.Element[] = [];
	for (let i = 1; i <= 5; i++) {
		paginationButtons.push(
			<button key={i} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'activePagination' : ''}>
				{i}
			</button>,
		);
	}

	const scrollMarket = () => {
		window.scrollTo({
			top: window.pageYOffset - 800,
			behavior: 'smooth',
		});
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			<section id="market" className="MarketUpdate__section">
				<div className="container">
					<div className="MarketUpdate__content">
						<h2>Market Update</h2>
						<div className="MarketUpdate__content--coinList">
							<div className="MarketUpdate__content--coinList--top">
								<p onClick={toggleSortOrder}>Coin List</p>
								<p onClick={toggleSortOrder}>Price</p>
								<p onClick={toggleSortOrder}>24h Change</p>
								<p onClick={toggleSortOrder}>Market Cap</p>
							</div>
							<div onLoad={() => setApiLoad(false)} className="MarketUpdate__content--coinList--row">
								{apiLoad && <span className="loader"></span>}
								{sortedData.map((item: CoinData) => (
									<Link onClick={scrollTop} to={`/coin/${item.id}`} className="coin-row" key={item.id}>
										<span>
											<img src={item.image} alt={item.name} /> {item.name}
										</span>
										<p>{'$ ' + item.current_price.toFixed(2)}</p>
										<p className={item.price_change_percentage_24h! >= 0 ? 'green-text' : 'red-text'}>
											{item.price_change_percentage_24h?.toFixed(2) + ' %'}
										</p>
										<p>{'$ ' + numberWithCommas(item.market_cap)}</p>
									</Link>
								))}
							</div>
						</div>
						{data && (
							<div onClick={scrollMarket} className="MarketUpdate__pagination">
								{paginationButtons}
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default MarketUpdate;
