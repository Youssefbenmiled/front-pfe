import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import DataListView from "../../../containers/tuteur/notifs/DataListView";
import ListPageHeading from "../../../containers/tuteur/notifs/ListPageHeading";
// import Select from "react-select";
// import { notifs } from "../../../constants/defaultValues";
import Pagination from "../../../containers/tuteur/notifs/Pagination";



class notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {


            isLoading: true,
            pageSizes: [1, 2, 5, 10, 20, 30, 50, 100],
            selectedPageSize: 10,
            currentPage: 1,
            totalItemCount: 0,
            totalPage: 3,
            notif: [],
            items: [],

        };
    }
    componentWillMount() {
        this.dataListRender();

    }
    // handleChangeNotif = value => {
    //     this.setState({
    //         valueNotif: value,
    //     }, this.dataListRender);

    // };

    changePageSize = size => {
        this.setState(
            {
                selectedPageSize: size,
                currentPage: 1
            },
            () => this.dataListRender()
        );
    };

    onChangePage = page => {
        this.setState(
            {
                currentPage: page
            },
            () => this.dataListRender()
        );
    };

    dataListRender() {
        const {

            selectedPageSize,
            currentPage,
        } = this.state;


        var query = "http://api.onyx.inedit-gd.tn/classe/getAll?";
        query += "count=" + selectedPageSize
        query += "&page=" + currentPage
        // if(valueNotif.value!='*')
        // query+='&notif='+valueNotif.value



        try {
            axios
                .get(query)
                .then(res => res.data)
                .then(data => {
                    this.setState({
                        totalItemCount: data.count,
                        totalPage: Math.ceil(data.count / selectedPageSize),
                        items: data.list,
                        isLoading: false
                    });
                });
        } catch (error) {
            console.log("failed" + error)
        }
    }





    render() {



        const {
            currentPage,
            selectedPageSize,
            totalItemCount,
            pageSizes,

        } = this.state;

        const { match } = this.props;
        const startIndex = (currentPage - 1) * selectedPageSize;
        const endIndex = currentPage * selectedPageSize;
        return this.state.isLoading ? (
            <div className="loading" />
        ) : (
                <Fragment>
                    {/* <label>
                        <h3>Affichage :</h3>
                    </label>

                    <Select
                        onChange={this.handleChangeNotif}
                        value={valueNotif}
                        options={notifs}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        required
                    /> */}
                    <div className="disable-text-selection">
                        <ListPageHeading
                            heading={'Notifications'}
                            changePageSize={this.changePageSize}
                            selectedPageSize={selectedPageSize}
                            totalItemCount={totalItemCount}
                            match={match}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            pageSizes={pageSizes}

                        />
                        <Row>
                            {this.state.items.map((notif, i) => {
                                return (

                                    <DataListView
                                        key={notif.id}
                                        notif={notif}
                                    />
                                );
                            })

                            }
                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPage={this.state.totalPage}
                                onChangePage={i => this.onChangePage(i)}
                            />
                        </Row>
                    </div>
                </Fragment>
            );
    }
}
export default notifications;
