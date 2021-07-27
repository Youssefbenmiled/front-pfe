import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Table, Label } from "reactstrap";
// import "./table.css";
import axios from "axios";
import DataListView from "../../../../containers/tuteur/administration/gst_emploi/DataListView";
import ListPageHeading from "../../../../containers/tuteur/administration/gst_emploi/ListPageHeading";



class emploi extends Component {
  constructor(props) {
    super(props);

    this.state = {


      isLoading: true,

      emploi: [],

      items: [],

    };
  }
  componentWillMount() {
    this.dataListRender();

  }
  dataListRender() {
    const {


    } = this.state;


    var query = "http://api.onyx.inedit-gd.tn/emploi/getAll?classe=" + 33;



    try {
      axios
        .get(query)
        .then(res => res.data)
        .then(data => {
          this.setState({

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

    } = this.state;


    return this.state.isLoading ? (
      <div className="loading" />
    ) : (
        <Fragment>

          <div className="disable-text-selection">
            <ListPageHeading
              heading={"Emploi de la classe 1 A"}
            />
            <Row>
              {this.state.items.map((emploi, i) => {
                return (

                  <DataListView
                    key={emploi.id}
                    emploi={emploi}
                  />
                );
              })

              }
            </Row>
          </div>
        </Fragment>
      );
  }
}
export default emploi;
