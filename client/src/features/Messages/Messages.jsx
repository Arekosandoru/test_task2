import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table from "./components/table/Table";
import Grid from "material-ui/Grid";
import Loading from "../../components/Loading";
import { LinearProgress } from 'material-ui/Progress';

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import axios from "axios";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: "5px 20px"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: "center",
        minWidth: "420px",
        color: theme.palette.text.secondary
    },
    linearProgress: {
        position: "absolute",
        top: 60,
        left: 0,
        width: "100%"
    },
    grid: {
        minWidth: "420px"
    }
});

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tables: {},
            loading: false
        };

        this.updateTables = this.updateTables.bind(this);
    }

    updateTables(rowId, prevTableType, nextTableType) { 
        let data = JSON.parse(JSON.stringify(this.state.tables));

        if (!data[prevTableType] || prevTableType === nextTableType) {
            return;
        }

        this.setState({loading: true});

        //Add row to selected collection
        data[nextTableType].push(
            data[prevTableType].find(item => {
                return item.id === rowId;
            })
        );

        data[prevTableType] = data[prevTableType].filter(item => {
            //Remove row from previous collection
            return item.id !== rowId;
        });

        //Update json file
        axios
            .post("/updateMessages", data)
            .then(response => {
                this.setState({
                    tables: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    componentDidMount = () => {
        this.setState({loading: true});
        axios
            .get("/getMessages")
            .then(response => {
                this.setState({
                    tables: response.data,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        const { classes } = this.props,
            { unsorted, technicalSupport, marketing, seo } = this.state.tables,
            isLoading = this.state.loading;

        return (
            <div className={classes.root}>
                {isLoading ? <div className={classes.linearProgress}><LinearProgress /></div> : null}
                {isLoading ? <Loading /> : null}
                <div className={classes.root} disabled={true}>
                    <Grid container spacing={24}>
                        <Grid className={classes.grid} item xs={12} sm={6}>
                            <Table
                                id={"unsorted"}
                                data={unsorted}
                                title={"Unsorted messages"}
                                updateTables={this.updateTables}
                            />
                        </Grid>
                        <Grid className={classes.grid} item xs={12} sm={6}>
                            <Grid item xs={12}>
                                <Table
                                    id={"technicalSupport"}
                                    data={technicalSupport}
                                    title={"Technical support"}
                                    updateTables={this.updateTables}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Table
                                    id={"marketing"}
                                    data={marketing}
                                    title={"Marketing"}
                                    updateTables={this.updateTables}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Table
                                    id={"seo"}
                                    data={seo}
                                    title={"SEO"}
                                    updateTables={this.updateTables}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Example.propTypes = {
    classes: PropTypes.object.isRequired
};

const styledComponent = withStyles(styles)(Example);

export default DragDropContext(HTML5Backend)(styledComponent);

const cloneObj = obj => {
    return Object.keys(obj).reduce((dolly, key) => {
        dolly[key] =
            obj[key].constructor === Object ? cloneObj(obj[key]) : obj[key];
        return dolly;
    }, {});
};

/**
 * Задание:
Необходимо разработать компонент для службы поддержки некоторого сайта. В левой части экрана показана таблица, 
содержащая таблицу неотсортированных писем с колонками: Summary, From email, Date. 
В правой части по вертикали (т.е. одна над другой) расположены три аналогичные таблицы с заголовками: Technical support, Marketing, CEO.
Необходимо реализовать возможность перетаскивания писем из левой таблицы в любую из правых таблиц.
В результате перетаскивания письмо должно исчезнуть из таблицы слева и появиться в последней строке выбранной таблицы справа.

Все должно выглядеть внешне приятно. Данные должны загружаться с помощью AJAX из JSON-файла, лежащего на сервере.
 */
