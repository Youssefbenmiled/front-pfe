import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import IntlMessages from "../../../../helpers/IntlMessages";
import { Colxx } from "../../../../components/common/CustomBootstrap";

moment.locale("fr");
const SignupSchema = Yup.object().shape({
  du: Yup.string().required("Titre obligatoire !!!"),
  a: Yup.string().required("Lieu obligatoire !!!"),


});
class DatePickerExamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null
    };
  }

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeDateTime = date => {
    this.setState({
      startDateTime: date
    });
  };

  handleChangeStart = date => {
    this.setState({
      startDateRange: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDateRange: date
    });
  };

  render() {
    const { messages } = this.props.intl;

    return (
      <Row className="chronique-event-ens">

        <label id="ap">
          <IntlMessages id="A partir de :" />
        </label>

        <Row className="mb-5">

          <Colxx xxs="6" className="datepicker-du">
            <br></br>


            <DatePicker
              id="DU"
              selected={this.state.startDateRange}
              selectsStart
              startDate={this.state.startDateRange}
              endDate={this.state.endDateRange}
              onChange={this.handleChangeStart}
              placeholderText={"Du :"}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="DD/MM/YYYY HH:mm"
              timeCaption="Temps"
              locale="fr"
            />
          </Colxx>
        </Row>
        <Row className="mb-5">
          <label id="ja">
            <IntlMessages id="Jusqu'a:" />
          </label>
          <Colxx xxs="6" className="datepicker-au">
            <DatePicker
              id="AU"
              selected={this.state.endDateRange}
              selectsEnd
              startDate={this.state.startDateRange}
              endDate={this.state.endDateRange}
              onChange={this.handleChangeEnd}
              placeholderText={"Au :"}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="DD/MM/YYYY HH:mm"
              timeCaption="Temps"
              locale="fr"
            />
          </Colxx>
        </Row>
      </Row>
    );
  }
}
export default injectIntl(DatePickerExamples);
