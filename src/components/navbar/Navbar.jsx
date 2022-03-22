import "./navbar.css";
import { logoutCall } from "../../apiCalls";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AccountBalanceOutlined,
  AttachMoney,
  HomeOutlined,
  ReorderOutlined,
} from "@material-ui/icons";
import { MenuItem, Avatar, Button, Input } from "@mui/material";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ options, socket }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { user, dispatch } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("getPostNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = ({ senderName, type }) => {
    let action;
    switch (type) {
      case "liked":
        action = type;
        return (
          <span className="notification">{`${senderName} ${action} your post`}</span>
        );
      case "commented":
        action = type;
        return (
          <span className="notification">{`${senderName} ${action} your post`}</span>
        );
      case "followed":
        action = type;
        return (
          <span className="notification">{`${senderName} ${action} you`}</span>
        );
      case "messaged":
        action = type;
        return (
          <span className="notification">{`${senderName} ${action} you`}</span>
        );
      case "replied":
        action = type;
        return (
          <span className="notification">{`${senderName} ${action} to your comment`}</span>
        );
      case "post":
        action = type;
        return (
          <span className="notification">{`${senderName} added a new ${action}`}</span>
        );
      default:
        break;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutCall(dispatch);
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const renderSwitch = (params) => {
    switch (params) {
      case "guest":
        return <GuestNavbar />;
      case "profile":
        return <ProfileNavbar />;
      default:
        break;
    }
  };

  const GuestNavbar = () => {
    return (
      <>
        <div className="logo-container">
          <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEXCpjP///++oBbBpS/BpCvHrUr49OvRvHPKslnWxYnAoyfEqTy/oR/Nt2a/oiK+oBm9ngnczJn7+fTdz5/p4MLFqkLVwoL07+Ht5c3x69nPum/n3b38+/jj17Dv6dTay5XIr1DMtWHk2bTg06fTv3vKslf8qofKAAAL+klEQVR4nOWd63qiMBCGkxCLRITUClqpFave/y0uaK0nAsnMIPHZ739d3iVMJpM5MN67ZotlsdtE4XRcZhPG2CQrx9Mw2uyK5WLW/z/P+vzxxfwjHAmRxolSUgYBOysIpFQqiVMhRuHHfNHnQ/RFuCiiUqexkhesZgVSxakuo6IvzD4IF+swEYnqYrvhVNVfhOs+KMkJ57kUiXSAu0gmQuZz6gciJfz6WekYRvdHGetV8UX5UISExVQDX979q9TTgu6xqAg/c4F8ezeQscg/iZ6MhnCdCTq8X0iRrUmejYDwLRKJi920VZCI6M0Dws+VVj3gnaT0Cr1YkYSfW/LleSupt0hGFOHnuGe+I6PAMSII36a6f74jo14hvkcw4Vf0JL4TYwT2AqCEO9GffWmSSqF7B4zwM4ufylcrzmCfI4hwr/vY/7oU6PxJhPPkuQv0IqWWzyAMxUB8tUTYO+G3GuoFnqTkd7+EGz0oXy296ZFwNkqG5quUlE4ROhfCZfq8Pb5NMnUxOA6E78Ov0LP0Rx+E0+dv8malK3LCWTasDb2Xymw/RkvCBUmMiVJSWQZX7QiXg7hp7QqEnb2xIvzxx8ZcS1vFHG0Id34CVog2JyoLwvchHdF22ewa3YQbfwErT/wdT+g1oA1iF6HHS/Qk0bVQOwh3vgN2m5t2Qk+3iVt1bBqthMtXAKwQW7f+NsLFawBW32KbA9dCOPPhuGulQLW44S2EmW/OtlkygxBO/ToutUuZz4tGwnefDrzdSo3boonwRczoRUaDaiCcpUM/sbNig7UxEI5ex8qcJUsXwuhlNoorxc2h4kbCl/sIT9KNAf9GwlfaJ64lbQlXr0qo9naEc/CJSSobSXmTTUuppvBbAyE4wUnmkZXy/XQ8UvqYO0xMqmwI9+A1Ktyytt8+57u8FI65th2EjxfhD4TfcDsqQFkviyLKsFmpF+mHdIYHwgn8PxRGWGtW7BOaq7vg4ZRxT7hDONxwwlrfUUzxJuP7sM0d4Rcm8oQjrDTfEuRZpXfZU3eEOWYrRBNWH2WOzuVUURshLjJDQFh9khsso759jFvCKWqRkBBWjDnuLk/envdvCD9x8V8iwmoplajjqb4Jvd0QHnDfORkh52tMaq7cmgi/kSF8QkI+KzHb1vW2f004RppqSkJU+pWcNhMiv0JqQr4UYINz/SVeEa6wuy0xIX+T0CeSVymMF8I3dOiCmpDPJlDEqz3xQhihT/bkhPwLerOgLlGpP0KUR9oXIf+CvsX0kXCNDyD2QMhnnWW2zUp+HggR58I+CfkbbG0Fo3tC7G7fGyE0ePu3658Jc4LDZz+EwFuwv0PUmZAi56InQqCvdbY1v4QFxW2hiXA7Km91mOYfhX0FzAz03x/PbwhxB8MOwpEM7iSlSlKdRXO7eq0fyGHqfEw8Ec5IrmKMhAYzHajYsmobtE711xXhD8ltmithLRnbFPuCPMq4uCIkWaQgQlYX+4adjBCX8neZHgm/aO4LgYTHAsoOQpBPqS+Ec5q8CzChRVXaBvAS4+UfIcV2z1CE1X94e3Eh5CWeNv0jIdHlD4qQJaPWrQN0uDsTLoiSSHGETMo2gwMxp8cHqgkJDk6XH4QTsiBuQwTsiccjVE2IDtD8CkvIgqTljhVgDuX+l5Aqgw1NyIJJy0t0d90CeSKk+gwJCJmaNv9ELcC9WP1EjMplYySELN0ZCZfua60+X1SEEdUdOgXh/d3YtdzXWh1yY44P0CYSQnkwErpbxGB8JCRLYiMhZMLYzwzwOYmacEGWSkpDaLanAJMoFhUhSQDj9HMkhCw1HordvcvK1DD+TpanR0T4mBJzVuj8ISa7itD9z0wiImTC1Bhi5/whVl4N4xlZVhkVYUNy2klLZ5MRHCpCunxgKsLaAjYKEFZMOYMFI5sfjIrQ2BUCsF18MbrNgo7wPq3pT1tnm5EuGMDbM4mMkJnqXNwdzPibkfndlISmX3I3pknBdnRp63SEscFzc/dOkjXb0FXH0BEqQ4X2t7PRUO8MF0m8uW8xHXyyh5uZXxl/VhqK7dw9UxkxVJBmMr7WyEA4PYyblZl+1+R9u29tcs+2CJcm2DY/iK0+jDZAG/7C2T0JVqzEEI5xhGan3/RJu7ttW4Y54fdHmBqqs90f8cAmcMA+CQ1+m/sxYYTg65PQtCG6f1NGazYwYWI45x+cCTFrtFfCn+a/cHe9ceqR0NCwBELop6WhI5ygvsQBCAGWpvST0PAduluako293PFNu4WzfxKM2dRLvzQ27PjOViOYMly4dHItZXAmy4lB5t9NDXl9zidgGTLc3drNcc8+c6/rfGj0vJ3PFtX5EJKK4/hYAOfecHpyPx+qjZ9xGtPVhXvSt9qxwsdYmzS07XaP0ySFn/FSZegY5B5ri5dexryNx0P3eGm68PLe4pze+yB3wy9mjCRL//fXqAgDU7aCu+MtOKNLxSC8mTE17nJepEHp5R2wsUsgJFxaEZqdQ1dRERov8t3tfrUaGFUKNKMjNB0OAab0mIvhWz6N+ZIbkBR1zKfxLSfquv7zTu6r7ZgTBYhBmn6OhlCY8r3db57qbYdRFACfH42EMDH2eHTP1q4TAipCMt+bhLAlTdi9sqcuDPIsR7ip0dNZgMqe3xxhQJaK+fewhOY+pJAUw7q5WU1I5dX0nOftvlccj5k+1VuYO3TWAizSo+vgUc1M9QZHzT9wFOA9HP3bY/aRJ6s0aQ0wA3Ioj70wvald66peAzQMkPkf4fD1h/WYqvaJ3IAy19PVwClHbuAa0rqKNGwv64b0WbuqIR22DrgeF3voqs4HJDZd1wEPWMtdF6xZjDWGvMLkupabptTZnTCQiS53Fm1PIX3Wburx++2pkMkGqSROdZYXVl1d54BT+m1PhX77YoTTB63yzW5uOVaMw5pT3/XF8Lq3Cazx7zkW8gL9afgS8t8vz/6D/z2G+Az0BT30GKIonemJsIQsr0vM1fdeX9VHCHqwhl5fBLamF8J3WDj3EnP1u+detbRgvkhTzz0f+ybCh4Y19k30r/clfLZkc+9L7/qXIiYTGvqXotNTqQlXUFfyppGwr32EK7sAn0Bs7COMbSRMSvgD77Fr7gXNP3HmlJBwtkXcat5eDHjYk53XozMx7bxberL70Fe/0pyhPMjWvvqDz0ao+bIUdQhon40w8HyLSusJjq9zvsWAM0oqfecCPKjorK4ZJahzInIKyyYgGDXTPWcGs2PACRfrVZqSpBNYzAp63ryno96W6+gg0oTo+stm3hPi0luuQkvt8yjKw209uIt2bpfVzC7M3DV7naav0aGdZDl3jYcvOzuvKT38/5x/+B/MsOSbV5xDmjjMIf0PZsm+4jzg1G0e8Ot9iq4znf+Dudz/wWz1+nJ66Oe2ljS26WslnL3MlhGoFp+/hRAZtXmiTBUonYSvYlCNZrSbEHz181Tp9hEZ7YR8R1fZ1pe0qcLGjpC/+44ozInhdoTwG67nSBg6uzkQ+o3YDWhB6PNC1V1L1I4QfNfcu7qMjDWhr5tGxzbhQlht/eRhMbQCY0NlCCFfUIVsySSVZfKmJSGfwW/Ve5Ea2QbYbQmr86JPgY3UfB6EE/J3f+yNzS4BIORLgtsvCklTjyU0IZ+NfDgUx6XTHZcTIWpYNpW0sdSbhJAv5bA2VUm7XRBOyHkIT1bCS+ydn9edkM+ToV5j54Q9IkLO94M4cUHHeD1KQv6dPT8iHmf202fxhHUA57lLVaU2JyVKQv6V6+ft/1JHdnN1KQmr88b0SYxSrxC5SAhCzj/HmCxJWz6xtS9yoyasTE7fjFJvYQaGirB6jyvdn81ROkS9PxJCzt8ifEZhk4LEZtzzMwgrrTPyxSpFBt0fbkVDWC3WXMR0kDJOI+Tn9ycqwkrFVJPEq2SiV+39FZxESFidkH+mOsalGspYrwrw7t4kUsJa81wK4KuUiZA54ds7iZyQ1xm/YSLc0kYDlQi1X6O3hgb1QVhrUUSlTmPVmUMaSBULcYiKvkrd+yI8ajH/CEdCpHGilJRX3a2DQEpVd1UQotx/OLQeAKhXwpNmi2Wx2+ThdFxmdZPySVaOp/tosyuWC0BmuKv+AU96vRN5xivjAAAAAElFTkSuQmCC" />
          <Link to="/">Cryptoscape</Link>
          {/* <Button className="navbar-menu-btn" onClick={() => setActiveMenu(!activeMenu)}>
        <ReorderOutlined />
      </Button> */}
        </div>
        <div className="menu-container">
          <MenuItem className="menu-item">
            <HomeOutlined />
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem className="menu-item">
            <AttachMoney />
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </MenuItem>
          <MenuItem className="menu-item">
            <NewspaperIcon />
            <Link to="/news">News</Link>
          </MenuItem>
          <MenuItem className="menu-item">
            <Search className="menu-search-icon" />
            <input placeholder="Search for people" className="searchInput" />
          </MenuItem>
          <MenuItem className="menu-item">
            <Link to="/login">Log In</Link>
          </MenuItem>
          <MenuItem className="menu-item">
            <Link to="/register">Sign Up</Link>
          </MenuItem>
        </div>
      </>
    );
  };

  const ProfileNavbar = () => {
    return (
      <>
        <div className="menu-container">
          <div id="navbar-left">
            <MenuItem className="menu-item">
              <div className="navbar-search-container">
                <Search className="menu-search-icon" />
                <input
                  placeholder="Search for people"
                  className="searchInput"
                />
              </div>
            </MenuItem>
          </div>
          <div id="navbar-right">
            <MenuItem className="menu-item">
              <Link to={"/messenger"}>
                <Chat className="menu-item-chat" />
                <span className="navbar-chat-badge"></span>
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onClick={() => setOpen(!open)}>
              <Notifications className="navbar-notification"/>
              {notifications.length > 0 && (
                <span className="navbar-notification-badge">
                  {notifications.length}
                </span>
              )}
            </MenuItem>
            <MenuItem className="menu-item">
              <Link to={`/profile/${user?.username}`}>
                <Avatar
                  src={
                    PF + user?.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt=""
                ></Avatar>
              </Link>
            </MenuItem>
            {/* <MenuItem className="menu-item">
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </MenuItem> */}
          </div>
          {open && (
            <div className="notifications">
              {notifications.map((n) => displayNotification(n))}
              <button className="notifcation-clear-btn" onClick={handleRead}>
                Mark as read
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return <div className="nav-container">{renderSwitch(options.value)}</div>;
};

export default Navbar;
//fix responsive navbar
