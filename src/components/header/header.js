import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon";
import { ReactComponent as Logo } from '../../assets/4.4 crown.svg';
import CartDropdown from "../cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../../redux/cart/cart-selectors";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./header-styles";
import { signOutStart } from "../../redux/user/user-actions";

const Header = ({ currentUser, hidden, signOutStart }) => {
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
                        (<OptionLink as='div' onClick={() => signOutStart()}>SIGNOUT</OptionLink>) :
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);