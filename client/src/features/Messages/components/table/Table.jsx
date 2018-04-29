import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { DropTarget } from "react-dnd";
import Row from "./Row";
import Compression from "../../../../components/Compression";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflow: "auto",
        minWidth: "420px",
        maxHeight: "80vh"
    },
    typography: {
        margin: "5px",
        padding: "5px 5px",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "center"
    },
    table: {
        minWidth: 420
    },
    padding: {
        padding: "3px 0px 4px 14px"
    },
});

const tableTarget = {
    drop(props, monitor, component) {
        const { updateTables, id } = props,
            item = monitor.getItem();

        updateTables(item.id, item.prevTableType, id);
    }
};

function collect(connect, monitor) {
    // console.log("monitor.getItem()", monitor.getItem());
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class SimpleTable extends React.Component {
    render() {
        const {
            data,
            classes,
            connectDropTarget,
            isOver,
            title,
            id
        } = this.props;

        return connectDropTarget(
            <div className={isOver ? "can-drop" : ""}>
                <Paper className={classes.root}>
                    {title ? (
                        <Typography
                            variant="title"
                            className={classes.typography}
                        >
                            {title}
                        </Typography>
                    ) : (
                        ""
                    )}
                    <Compression>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell className={classes.padding}>Summary</TableCell>
                                    <TableCell className={classes.padding} numeric={true}>From email</TableCell>
                                    <TableCell className={classes.padding} numeric={true}>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.length > 0 ? (
                                    data.map(n => {
                                        // n.prevTableType = id;
                                        return <Row data={n} prevTableType={id} key={n.id} />;
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell>Empty</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Compression>
                </Paper>
            </div>
        );
    }
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default DropTarget("row", tableTarget, collect)(
    withStyles(styles)(SimpleTable)
);
