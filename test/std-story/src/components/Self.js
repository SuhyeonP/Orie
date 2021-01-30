import React from 'react';
import PropTypes from 'prop-types'



export default function Self({ task: { children, color,italic,underline } }) {
    const style = {
        color: color,
        fontStyle: italic ? "italic" : "normal",
        textDecoration: underline ? "underline" : "none",
    }
    return <span style={style}>hi</span>
}
Self.propTypes = {
    /** Composition of the task */
    task: PropTypes.shape({
        children:PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
    }),
};
Self.defaultProps={
    color:"black",
    italic:false,
    underline:false
}