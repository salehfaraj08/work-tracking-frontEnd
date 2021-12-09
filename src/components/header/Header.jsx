import { useEffect } from 'react';
import { Link, withRouter,useHistory } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/authentication';
import './header.css'

const Header = () => {
    const history = useHistory();
    const handleLogout = () => {
        logout(() => {
            history.push('/signin');
        });
    };
    useEffect(() => {
        if (!isAuthenticated())
            history.push('/signin');
    }, [])



    // render
    return (<>
        <nav className="navbar">
            {/* <!-- LOGO --> */}
            <Link className='a' to='/'>
                <div className="logo">S.F <i className="fas fa-briefcase"></i></div>
            </Link>
            {/* <!-- NAVIGATION MENU --> */}
            <ul className="nav-links">
                {/* <!-- USING CHECKBOX HACK --> */}

                <input type="checkbox" id="checkbox_toggle" />
                <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>


                {/* <!-- NAVIGATION MENUS --> */}
                <div className="menu">
                    {!isAuthenticated() && <li><Link className='a' to='/'>Home</Link> </li>}

                    {!isAuthenticated() &&
                        <li>
                            <i style={{ marginLeft: '5px' }} className='fas fa-sign-in-alt'></i>
                            <Link className='a' to='/signin'>Sign in</Link>
                        </li>
                    }
                    {isAuthenticated() && isAuthenticated().role === 'user' && (
                        <>
                            <li>
                                <Link className='a' to='/user'>
                                    profile
                                </Link>
                            </li>
                            <li>
                                <Link className='a' to='/user/startShift'>
                                    Start Shift
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 'admin' && (
                        <>
                            <li>
                                <Link className='a' to='/admin'>
                                    profile
                                </Link>
                            </li>
                            <li>
                                <Link className='a' to='/admin/addWorker'>
                                    Add Worker
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated() && (
                        <>
                            <li className='log-out'>
                                <button
                                    className='btn btn-link text-secondary text-decoration-none pl-0'
                                    onClick={handleLogout}
                                >
                                    <i className='fas fa-sign-out-alt'></i>{' '}
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    </>);
};

export default withRouter(Header);