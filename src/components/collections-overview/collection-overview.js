import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './collections-overview.scss';
import { selectCollectionsForPreview } from "../../redux/shop/shop-selectors";
import CollectionPreview from "../collection-preview/collection-preview";

const collectionsOverview = (props) => {
    const { collections } = props;
    return (
        <div className='collections-overview'>
            {
                collections.map(({ id, ...otherCollectionProps }) => {
                    return <CollectionPreview key={id}
                        {...otherCollectionProps} />
                })
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(collectionsOverview);