import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './directory.scss';
import MenuItem from '../menu-item/menu-item';
import { selectDirectorySection } from "../../redux/directory/directory-selectors";


const Directory = (props) => {
    return (
        <div className='directory-menu'>
            {
                props.directory
                    .map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    directory: selectDirectorySection
});

export default connect(mapStateToProps)(Directory);