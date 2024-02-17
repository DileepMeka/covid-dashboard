import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class Header extends Component {
  state = {
    active: 'HOME',
  }

  onHomeClick = () => {
    this.setState({
      active: 'HOME',
    })
  }

  onAboutClick = () => {
    this.setState({
      active: 'ABOUT',
    })
  }

  toggleNavbar = () => {
    const navbar = document.querySelector('.sm-navbar')
    navbar.classList.toggle('d-none')
  }

  render() {
    const {active} = this.state
    return (
      <>
        <div className="header lg-container">
          <Link to="/" className="link logo-container">
            <h1 className="logo">
              COVID19<span>INDIA</span>
            </h1>
          </Link>
          <ul className="links-container">
            <button>
              <Link
                onClick={this.onHomeClick}
                className={`links ${active === 'HOME' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </button>
            <button>
              <Link
                onClick={this.onAboutClick}
                className={`links ${active === 'ABOUT' ? 'active' : ''}`}
                to="/About"
              >
                About
              </Link>
            </button>
          </ul>
        </div>
        <div className="header sm-container">
          <div className="logo-container">
            <img src="img/COVID19INDIAlogo.png" alt="logo" className="logo" />
          </div>
          <div>
            <button onClick={this.toggleNavbar} className="navbar-button">
              <img
                src="img/add-to-queue 1navbar.png"
                alt="add-to-queue"
                className="navbar-button-img"
              />
            </button>
          </div>
        </div>
        <div className="links-container sm-navbar  d-none">
          <ul className="sm-links-container">
            <button className="link-button links">
              <Link
                onClick={this.onHomeClick}
                className={`links ${active === 'HOME' ? 'active' : ''}`}
                to="/"
              >
                Home
              </Link>
            </button>
            <button>
              <Link
                className={`link-button links ${
                  active === 'ABOUT' ? 'active' : ''
                }`}
                onClick={this.onAboutClick}
                to="/About"
              >
                About
              </Link>
            </button>
          </ul>
          <button onClick={this.toggleNavbar} className="cancel-button">
            <img
              src="img/Solidcancel.png"
              alt="cancel"
              className="cancel-button-img"
            />
          </button>
        </div>
      </>
    )
  }
}
