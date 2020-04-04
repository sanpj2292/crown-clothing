import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";


import CollectionOverview from "../../components/collections-overview/collection-overview";
import CollectionPage from "../collection/collection";
import { selectCollections } from '../../redux/shop/shop-selectors';
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase-utils";
import { updateCollections } from "../../redux/shop/shop-actions";
import WithSpinner from "../../components/with-spinner/with-spinner";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapShot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                    render={(props) => (<CollectionOverviewWithSpinner
                        isLoading={loading} {...props} />)} />
                <Route path={`${match.path}/:collectionId`}
                    render={(props) => (
                        <CollectionPageWithSpinner {...props} isLoading={loading} />
                    )} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
});

const mapDispatchToProps = dispatch => {
    return {
        updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);