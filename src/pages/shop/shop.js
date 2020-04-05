import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";


import CollectionOverview from "../../components/collections-overview/collection-overview";
import CollectionPage from "../collection/collection";
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop-selectors';
import { fetchCollectionsStartAsync } from "../../redux/shop/shop-actions";
import WithSpinner from "../../components/with-spinner/with-spinner";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const { match, isCollectionFetching, isCollectionLoaded } = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    render={(props) => (<CollectionOverviewWithSpinner
                        isLoading={isCollectionFetching} {...props} />)} />
                <Route path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner {...props} isLoading={!isCollectionLoaded} />
                    )} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);