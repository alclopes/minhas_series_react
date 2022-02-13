import React, { useState } from 'react';
import {
	Navbar,
	NavbarBrand,
	Collapse,
	Nav,
	NavItem,
	NavLink,
	NavbarToggler,
} from 'reactstrap';
import logo from './logo.png';

import { Link } from 'react-router-dom';

const Header = (props) => {
	const [open, setOpen] = useState(false);
	const toggle = () => {
		setOpen(!open);
	};

	return (
		<>
			<div className='jumbotron'>
				<Navbar color='light' light expand='md'>
					<NavbarBrand tag={Link} to='/'>
						<img id='img-logo' src={logo} alt='logo' />
						<span className='m-4 text-center'>My Series &raquo;</span>
					</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={open} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink tag={Link} to='/genders'>
									Genders
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to='/series'>
									Series
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		</>
	);
};

export default Header;
