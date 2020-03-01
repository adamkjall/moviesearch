import React from 'react'
import './navbarStyle.css'

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li>My collection</li>
                    <li>Trending movies</li>
                    <li>New movies</li>
                    <li>Watchlist</li>
                    <li>My reviews</li>
                    <hr></hr>
                    <li>My account</li>
                    <li>Settings</li>
                    <li>Log out</li>
                </ul>
            </nav>
        )
    }
}

export default Navbar