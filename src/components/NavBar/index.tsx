import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './styles.scss';

const Navbar: FC = () => {
	const [sticky, setSticky] = useState(false);
	const [mobile, setMobile] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 100) {
			setSticky(true);
		} else {
			setSticky(false);
		}
	};

	window.addEventListener('scroll', handleScroll);

	const openMobile = () => {
		setMobile(!mobile);
	};

	return (
		<>
			<nav>
				<div className="NavBar">
					<Link to="/">
						<p>Matrix-Crypto-Tracker</p>
					</Link>
					<ul className="NavBar__list">
						<li>
							<a href="#home">Home</a>
						</li>
						<li>
							<a href="#market">Market</a>
						</li>
					</ul>
					<span className="NavBar__icons">
						<i onClick={openMobile} className="fa-solid fa-bars-staggered NavBar__hamburgerMenu"></i>
					</span>
				</div>
			</nav>

			<div className={cn('NavBar__mobile', { 'mobile-up': mobile })}>
				<i onClick={openMobile} className="fa-solid fa-xmark NavBar__Mobile--close"></i>
				<ul>
					<li onClick={openMobile}>
						<a href="#home">Home</a>
					</li>
					<li onClick={openMobile}>
						<a href="#market">Market</a>
					</li>
					<li onClick={openMobile}>
						<a href="#choose-us">Choose Us</a>
					</li>
					<li onClick={openMobile}>
						<a href="#join">Join</a>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Navbar;
