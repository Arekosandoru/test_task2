import React from "react";
import { TableCell, TableRow } from "material-ui/Table";
import { withStyles } from "material-ui/styles";
import classNames from "classnames";
import Drop from "./Drop";

import moment from "moment";

const styles = theme => ({
    padding: {
        padding: "3px 0px 4px 14px"
    },
    dragButton: {
        width: "40px"
    },
    text: {
        overflow: "hidden",
        maxWidth: "90px"
    },
    email: {
        overflow: "hidden",
        maxWidth: "30px"
    }
});

class SimpleRow extends React.Component {
    render() {
        const { data, prevTableType, classes } = this.props;
        return (
            <TableRow>
                <TableCell className={classNames(classes.dragButton, classes.padding)}>
                    <Drop data={data} prevTableType={prevTableType} />
                </TableCell>
                <TableCell className={classNames(classes.text, classes.padding)}>{data.text}</TableCell>
                <TableCell className={classes.padding} numeric={true}>{data.email}</TableCell>
                <TableCell className={classes.padding} numeric={true}>
                    {moment(data.date).format("lll")}
                </TableCell>
            </TableRow>
        );
    }
}

export default withStyles(styles)(SimpleRow);
