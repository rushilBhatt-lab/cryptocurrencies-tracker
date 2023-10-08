describe('Navbar Component', () => {
	beforeEach(() => {
		// Visit the page with the Navbar component.
		cy.visit('http://localhost:3000');
	});

	it('should display the app name', () => {
		cy.get('.NavBar p').should('contain', 'Matrix-Crypto-Tracker');
	});

	it('should navigate to Home when Home link is clicked', () => {
		cy.get('.NavBar__list a[href="#home"]').click();
	});

	it('should navigate to Market when Market link is clicked', () => {
		cy.get('.NavBar__list a[href="#market"]').click();
	});

	it('should open the mobile menu when the hamburger menu is clicked', () => {
		cy.get('.NavBar__hamburgerMenu').click();
		cy.get('.NavBar__mobile').should('have.class', 'mobile-up');
	});

	it('should close the mobile menu when the close icon is clicked', () => {
		cy.get('.NavBar__hamburgerMenu').click();
		cy.get('.NavBar__Mobile--close').click();
		cy.get('.NavBar__mobile').should('not.have.class', 'mobile-up');
	});

	it('should navigate to Home when Home link in mobile menu is clicked', () => {
		cy.get('.NavBar__hamburgerMenu').click();
		cy.get('.NavBar__mobile a[href="#home"]').click();
	});

	it('should navigate to Market when Market link in mobile menu is clicked', () => {
		cy.get('.NavBar__hamburgerMenu').click();
		cy.get('.NavBar__mobile a[href="#market"]').click();
	});
});
