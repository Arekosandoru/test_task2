import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "material-ui/styles";

import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Typography from "material-ui/Typography";

const styles = theme => ({
    expand: {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        }),
        marginLeft: "auto"
    },
    expandOpen: {
        transform: "rotate(180deg)"
    }
});

class Compression extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: true
        };
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { classes, children, title } = this.props;
        
        return (
            <div>
                <Typography
                    component="p"
                    style={{
                        fontWeight: 400,
                        fontSize: "1.3125rem",
                        cursor: "pointer"
                    }}
                    onClick={this.handleExpandClick}
                >
                    
                    <IconButton
                        className={classNames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    {" " + title ? title : ""}
                </Typography>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit style={{overflowX: 'auto'}}>
                    {children}
                </Collapse>
            </div>
        );
    }
}

Compression.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Compression);
