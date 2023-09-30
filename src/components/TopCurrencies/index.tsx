import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';
import './styles.scss';

interface CoinData {
	id: string;
	name: string;
	image: string;
	price_change_percentage_24h?: number;
	current_price?: number;
}

const TopCurrencies: FC = () => {
	const [data, setData] = useState<CoinData[]>([]);
	const [coinsLoad, setCoinsLoad] = useState<boolean>(true);

	const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false`;

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
				const jsonData: CoinData[] = await response.json();
				setData(jsonData);
				setCoinsLoad(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [url]);

	return (
		<>
			<section id="home" className="TopCurrencies">
				<div className="container">
					<div className="TopCurrencies__content">
						<div className="TopCurrencies__content--text">
							<h1>
								Track your
								<br /> <span>Crypto currencies</span>
							</h1>
						</div>
						<div className="TopCurrencies__coinSlider">
							{coinsLoad && <span className="loader"></span>}
							{data.map((item: CoinData) => (
								<Link to={`/coin/${item.id}`} key={item.id} className="TopCurrencies__coinSlider--content">
									<img src={item.image} alt={item.name} />
									<p className="TopCurrencies__coinSlider--name">
										{item.name}
										<span
											className={
												'TopCurrencies__coinSlider--price ' +
												(item.price_change_percentage_24h! <= 0 ? 'red-text' : 'green-text')
											}
										>
											{item.price_change_percentage_24h?.toFixed(2) + '%'}
										</span>
									</p>
									<p className="TopCurrencies__coinSlider--price">{'$ ' + numberWithCommas(item?.current_price as any)}</p>
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default TopCurrencies;
