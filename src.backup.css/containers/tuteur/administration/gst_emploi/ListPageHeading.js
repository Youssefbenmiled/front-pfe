import React, { Component } from "react";
import {
  Row,
} from "reactstrap";
import { injectIntl } from "react-intl";

import { Colxx, Separator } from "../../../../components/common/CustomBootstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

// import "./pageheading.css"
class ListPageHeading extends Component {
  constructor(props) {
    super(props);
    this.state = {



    };
  }


  render() {

    const {

      heading,

    } = this.props;
    return (
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <br></br>

            <h1>
              <IntlMessages id={heading} />
            </h1>

          </div>

          <Separator className="mb-5" />
        </Colxx>

      </Row>
    );
  }
}

export default injectIntl(ListPageHeading);
