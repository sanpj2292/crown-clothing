import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon";
import { ReactComponent as Logo } from '../../assets/4.4 crown.svg';
import { auth } from '../../firebase/firebase-utils';
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./header-styles";

const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>SHOP</OptionLink>
                <OptionLink to='/shop'>CONTACT</OptionLink>
                {
                    currentUser ?
                        (<OptionLink as='div' onClick={() => auth.signOut()}>SIGNOUT</OptionLink>) :
                        (<OptionLink to='/signin'>SIGNIN</OptionLink>)
                }
                <CartIcon />
            </OptionsContainer>
            {!hidden ? <CartDropdown /> : null}
        </HeaderContainer>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);