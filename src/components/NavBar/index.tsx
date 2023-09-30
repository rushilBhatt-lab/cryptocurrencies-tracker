import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import './styles.scss';

const Navbar: FC = () => {
	const [sticky, setSticky] = useState(false);
	const [mobile, setMobile] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 150) {
			setSticky(true);
		} else {
			setSticky(false);
		}
	};

	window.addEventListener('scroll', handleScroll);

	//   const goTop = () => {
	//     window.scrollTo({
	//       top: (0, 0),
	//       behavior: "smooth",
	//     });
	//   };

	const openMobile = () => {
		setMobile(!mobile);
	};

	return (
		<>
			<nav className={cn({ sticky: 'NavBar__sticky' })}>
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

			<div className={`NavBar__mobile ${mobile ? 'mobile-up' : ''}`}>
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
