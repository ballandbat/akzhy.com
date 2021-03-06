import React from "react"
import { Link } from "gatsby"

import SideBar from "./sidebar"
import Logo from "./logo"
import SocialLinks from "./social"
import { Sun, Moon } from "./icons"

const SidebarContents = ({ location, cycleTheme, currentTheme }) => {
    const navLinks = [
        {
            name: "Home",
            url: "/",
            active: location === "/",
        },
        {
            name: "About",
            url: "/about",
        },
        {
            name: "Shelf",
            url: "/shelf",
        },
        {
            name: "Blog",
            url: "/blog",
        },
        {
            name: "Contact",
            url: "/contact",
        },
    ]

    if (location.pathname !== "/") {
        navLinks.forEach(item => {
            if (item.url.split("/")[1] === location.pathname.split("/")[1]) {
                item.active = true
            }
        })
    }

    const list = []

    navLinks.forEach((item, i) => {
        list.push(
            <NavLink data={item} key={"sidenav" + item.name + "" + item.url} />
        )
    });

    list.push(
        <NavActionIcons key="navactioniconssidebar" cycleTheme={cycleTheme} currentTheme={currentTheme}/>
    );

    return (
        <div className="sidebar-content">
            <div className="sidebar-contents">
                <div className="logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <ul className="links text-secondary">{list}</ul>
                <div className="social-links">
                    <SocialLinks />
                </div>
            </div>
        </div>
    )
}

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarPlaceholderHeight: 100,
            sidebarOpen: false,
        }

        this.setSidebarOpenState = this.setSidebarOpenState.bind(this)

        this.navbar = React.createRef()
    }

    windowOnScroll = e => {
        const top = window.pageYOffset || document.documentElement.scrollTop
        if (top > 10) {
            this.navbar.current.classList.add("scrolled")
        } else {
            this.navbar.current.classList.remove("scrolled")
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.windowOnScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.windowOnScroll)
    }

    setSidebarOpenState(open) {
        this.setState({ sidebarOpen: open })
    }


    render() {
        const location = this.props.location.location
        const navLinks = [
            {
                name: "About",
                url: "/about",
            },
            {
                name: "Shelf",
                url: "/shelf",
            },
            {
                name: "Home",
                url: "/",
                logo: true,
                active: location.pathname === "/",
            },
            {
                name: "Blog",
                url: "/blog",
            },
            {
                name: "Contact",
                url: "/contact",
            },
        ]

        if (location.pathname !== "/") {
            navLinks.forEach(item => {
                if (
                    item.url.split("/")[1] === location.pathname.split("/")[1]
                ) {
                    item.active = true
                }
            })
        }

        const list = []

        navLinks.forEach((item, i) => {
            list.push(<NavLink data={item} key={item.name + "" + item.url} />)
        })

        list.push(
            <NavActionIcons key="navactionicons" cycleTheme={this.props.cycleTheme} currentTheme={this.props.currentTheme}/>
        )

        return (
            <React.Fragment>
                <div className="sidebar-container">
                    <SideBar open={this.state.sidebarOpen} onChange={this.setSidebarOpenState}>
                        <SidebarContents location={location} cycleTheme={this.props.cycleTheme} currentTheme={this.props.currentTheme}/>
                    </SideBar>
                </div>
                <nav ref={this.navbar}>
                    <div className="container">
                        <ul className="main-nav">{list}</ul>
                        <ul className="mobile-nav">
                            <li
                                className="menu-button"
                                onClick={() => this.setSidebarOpenState(true)}
                            >
                                <button
                                    className="hamburger"
                                    name="toggle-menu"
                                    title="Toggle Menu"
                                >
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </button>
                            </li>
                            <li className="has-image">
                                <Link to="/">
                                    <Logo />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

const NavLink = ({ data }) => {
    return (
        <li className={"color-primary " + (data.logo ? "has-image" : "")}>
            <Link
                to={data.url}
                title={data.name}
                className={data.active ? "active" : ""}
            >
                {data.logo && <Logo />}
                {!data.logo && <React.Fragment>{data.name}</React.Fragment>}
            </Link>
        </li>
    )
}

const NavActionIcons = ({cycleTheme, currentTheme}) => (
    <li className="color-primary action-icons">
        <div className="icons">
            <button className="ico" title={`Switch to ${currentTheme.nextTheme.charAt(0).toUpperCase() + currentTheme.nextTheme.slice(1)} Theme`} onClick={cycleTheme}>
                <Moon className={currentTheme.theme === "light" ? "active" : ""}/>
                <Sun className={currentTheme.theme === "dark" ? "active" : ""} />
            </button>
        </div>
    </li>
)
