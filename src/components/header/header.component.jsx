import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from "reselect";

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            {
                currentUser?
                <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden?null:<CartDropdown/>
        }
    </div>
);

const mapStateToProps =  createStructuredSelector ({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})

export default connect(mapStateToProps)(Header);