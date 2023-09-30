import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import './styles.scss';

interface CoinData {
	id: string;
	name: string;
	image: { large: string };
	coingecko_rank: number;
	market_data: {
		price_change_percentage_24h: number;
		current_price: { usd: number };
	};
	symbol: string;
	description: { en: string };
}

const CoinInfo: FC = () => {
	const { coinId } = useParams<{ coinId: string }>();
	const [coin, setCoin] = useState<CoinData | null>(null);
	const [loadCoin, setLoadCoin] = useState<boolean>(true);

	const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error('Error!');
				}
				const json: CoinData = await response.json();
				setCoin(json);
				setLoadCoin(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [url]);

	function numberWithCommas(x: number): string {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	return (
		<>
			<section className="CoinInfo">
				<div className="container">
					<div className="CoinInfo__content">
						<div className="CoinInfo__content--imgSide">
							{loadCoin && <span className="loader"></span>}
							{coin?.image ? <img src={coin.image.large} alt={coin.id} /> : null}
							<h2>{coin?.name}</h2>
							<p>Rank: #{coin?.coingecko_rank}</p>
						</div>
						<div className="CoinInfo__content--textSide">
							<div className="numb">
								<div className="CoinInfo__content--textSide--24h">
									<span>24h Change:</span>
									<p
										className={
											coin?.market_data && coin.market_data?.price_change_percentage_24h >= 0 ? 'green-text' : 'red-text'
										}
									>
										{coin?.market_data ? coin.market_data.price_change_percentage_24h.toFixed(2) + '%' : ''}
									</p>
								</div>
								<div className="CoinInfo__content--textSide--current">
									<span>Price:</span>
									<p className="green-text">
										{coin?.market_data?.current_price !== undefined
											? '$' + numberWithCommas(coin.market_data.current_price.usd)
											: null}
									</p>
								</div>
								<div className="CoinInfo__content--textSide--symbol">
									<p>Symbol:</p>
									<span>{coin?.symbol}</span>
								</div>
							</div>
							{loadCoin && <span className="loader"></span>}
							<div className="description">
								<p
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(coin?.description ? coin.description.en : ''),
									}}
								></p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CoinInfo;
