import React from "react";
import PropTypes from "prop-types";
// import { CircularProgress } from "material-ui/Progress";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    container: {
        position: "fixed",
        width: "100%",
        height: "100%",
        margin: "-20px"
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate3d(-50%, -50%, 0)"
    }
});

class Loading extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                {/* <CircularProgress className={classes.progress} size={100} /> */}
            </div>
        );
    }
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
