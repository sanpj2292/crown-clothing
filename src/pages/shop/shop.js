import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";


import CollectionOverview from "../../components/collections-overview/collection-overview";
import CollectionPage from "../collection/collection";
import { selectCollections } from '../../redux/shop/shop-selectors';
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase-utils";
import { updateCollections } from "../../redux/shop/shop-actions";
class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapShot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapShot);
            updateCollections(collectionsMap);
            // console.log();
        });
    }

    render() {
        const { match } = this.props
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
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