import React from 'react'
import {NavLink} from "react-router-dom"
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg"
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg"
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg"


function Navbar() {
  return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className='navbarListItems'>

                <NavLink className='navbarListItem' to="/">
                    <ExploreIcon width="36px" height="36px" />
                    <p>Explore</p>
                </NavLink>

                <NavLink className='navbarListItem' to="/offers">
                    <OfferIcon width="36px" height="36px" />
                    <p>Offers</p>
                </NavLink>

                <NavLink className='navbarListItem' to="/profile">
                    <PersonOutlineIcon width="36px" height="36px" />
                    <p>Profile</p>
                </NavLink>

            </ul>
        </nav>
    </footer>
  )
}

export default Navbar