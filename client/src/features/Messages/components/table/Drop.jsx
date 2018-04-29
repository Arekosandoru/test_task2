import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

const rowSource = {
    beginDrag(props, monitor) {
        const item = { id: props.data.id, prevTableType: props.prevTableType };
		return item;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Drop extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div
                style={{
                    opacity: isDragging ? 0 : 1,
                    fontSize: 25,
                    fontWeight: "bold",
                    cursor: "move"
                }}
            >
                :::
            </div>
        );
    }
}

Drop.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource("row", rowSource, collect)(Drop);
