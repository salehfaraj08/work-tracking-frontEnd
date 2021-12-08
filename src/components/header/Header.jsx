import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../services/authentication';
import './header.css'

const Header = ({ history }) => {
    const handleLogout = evt => {
        // logout(() => {
        // 	history.push('/signin');
        // });
    };



    // render
    return (<>
        {/* {
            !isAuthenticated() && <Link to='/'>Home</Link>
        }
        {
            isAuthenticated() && <Link to='/user'>user</Link>
        } */}
        <nav class="navbar">
            {/* <!-- LOGO --> */}
            <Link className='a' to='/'>
                <div class="logo">S.F <i class="fas fa-briefcase"></i></div>
            </Link>
            {/* <!-- NAVIGATION MENU --> */}
            <ul class="nav-links">
                {/* <!-- USING CHECKBOX HACK --> */}

                <input type="checkbox" id="checkbox_toggle" />
                <label for="checkbox_toggle" class="hamburger">&#9776;</label>


                {/* <!-- NAVIGATION MENUS --> */}
                <div class="menu">
                    {!isAuthenticated() && <li><Link className='a' to='/'>Home</Link> </li>}

                    {!isAuthenticated() &&
                        <li>
                            <Link className='a' to='/signin'>Sign in</Link>
                            <i style={{ marginLeft: '5px' }} className='fas fa-sign-in-alt'></i>
                        </li>
                    }
                </div>
            </ul>
        </nav>
    </>);
};

export default withRouter(Header);