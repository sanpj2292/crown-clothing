import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import CollectionOverview from "../../components/collections-overview/collection-overview";
import { selectCollections } from '../../redux/shop/shop-selectors';

const ShopPage = (props) => {
    return (
        <div className='shop-page'>
            <CollectionOverview />
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToProps)(ShopPage);