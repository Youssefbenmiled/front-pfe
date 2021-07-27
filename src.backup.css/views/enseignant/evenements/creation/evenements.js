import React, { Component } from "react";

import { Formik, Form, Field } from "formik";
import IntlMessages from "../../../../helpers/IntlMessages";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Row, Card, CardBody, FormGroup, Button, Label, CustomInput, Input, Tooltip } from "reactstrap";
import { Colxx } from "../../../../components/common/CustomBootstrap";
import DatePickerExamples from "./DatePickerExamples";
// import { FormikDatePicker } from "./FormikFields";
import moment from "moment";

moment.locale("fr");
const SignupSchema = Yup.object().shape({
  fichier: Yup.string().required("Veuillez insérer un fichier "),
  description: Yup.string().required("DVeuillez insérer une description"),
  titre: Yup.string().required("Veuillez insérer un titre "),
  lieu: Yup.string().required("Veuillez insérer un lieu"),


});

class Formevenement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      selectedOption: "public",
      tooltipOpenPrive: false,
      tooltipOpenPublic: false,
      valueNiveau: [],
      valueClasse: []



    };
  }

  handleSubmit(values) {
    console.log(values);
  }
  public = () => {
    this.setState({ selectedOption: "public" })
  }
  prive = () => {
    this.setState({ selectedOption: "prive" })
  }
  togglePrive = () => {
    this.setState(prevState => ({
      tooltipOpenPrive: !prevState.tooltipOpenPrive
    }));
  };
  togglePublic = () => {
    this.setState(prevState => ({
      tooltipOpenPublic: !prevState.tooltipOpenPublic
    }));
  };
  handleChangeNiveau = (value) => {
    //this.state.valueNiveau.push(value)
    this.setState({ valueNiveau: value })
    console.log(this.state.valueNiveau)
  }
  handleChangeClasse = (value) => {
    this.state.valueClasse.push(value)
    this.setState({ valueClasse: value })
    console.log(this.state.valueClasse)
  }
  render() {
    const levels = [
      { label: " 1", value: "1" },
      { label: " 2", value: "2" },
      { label: " 3", value: "3" },
      { label: " 4", value: "4" },
      { label: " 5", value: "5" },
      { label: " 6", value: "6" }
    ];
    const classes = [
      { label: "classe 1", value: "1" },
      { label: "classe 2", value: "2" },
      { label: "classe 3", value: "3" },
    ]
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <center> <h1 className="mb-4">Organiser un évenement</h1></center>

              <Formik
                initialValues={{
                  titre: "",
                  description: "",
                  dateheure: "",
                  lieu: ""
                }}
                validationSchema={SignupSchema}
                onSubmit={this.handleSubmit}
              >
                {({
                  handleSubmit,
                  setFieldValue,
                  setFieldTouched,
                  values,
                  errors,
                  touched,
                  isSubmitting
                }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <FormGroup className="error-l-75" id="form-titre">
                        <Label>Titre :</Label>
                        <Field className="form-control" name="titre" id="titre" />
                        {errors.titre && touched.titre ? (
                          <div className="invalid-feedback d-block">
                            {errors.titre}
                          </div>
                        ) : null}
                      </FormGroup>
                      <DatePickerExamples />

                      <FormGroup className="error-l-75" id="form-lieu">
                        <Label id="label-lieu">Lieu :</Label>
                        <Field className="form-control" name="lieu" id="lieu" />
                        {errors.lieu && touched.lieu ? (
                          <div className="invalid-feedback d-block">
                            {errors.lieu}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="error-l-75" id="form-desc">
                        <Label>Description :</Label>
                        <Field
                          className="form-control"
                          name="description"
                          component="textarea"
                          rows="6"
                          id="desc"
                        />
                        {errors.description && touched.description ? (
                          <div className="invalid-feedback d-block">
                            {errors.description}
                          </div>
                        ) : null}
                        <br></br>

                      </FormGroup>
                      <FormGroup className="error-l-75" id="form-file">

                        <Field
                          type="file"
                          id="input-file"
                          name="fichier"
                          id="filet"
                        />
                        {errors.fichier && touched.fichier ? (
                          <div className="invalid-feedback d-block">
                            {errors.fichier}
                          </div>
                        ) : null}
                        <br></br>

                      </FormGroup>

                      <Label>
                        <IntlMessages id="C'est un évenement :" />
                      </Label>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            value="Public"
                            onClick={this.public}
                            checked={this.state.selectedOption === "public"}
                            id="public"
                          />
                            Public
                       </label>
                        <Tooltip
                          placement="bottom"
                          isOpen={this.state.tooltipOpenPublic}
                          target={"public"}
                          toggle={this.togglePublic}
                          id="tltp"
                        >
                          Evenement public pour toutes les classes
                         </Tooltip>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>
                          <input
                            type="radio"
                            value="Privé"
                            onClick={this.prive}
                            checked={this.state.selectedOption === "prive"}
                            id="prive"
                          />
                            Privé
                        </label>
                        <Tooltip
                          placement="bottom"
                          isOpen={this.state.tooltipOpenPrive}
                          target={"prive"}
                          toggle={this.togglePrive}
                          id="tltp"
                        >
                          Evenement spécifique
                         </Tooltip>

                      </div>
                      <br></br>
                      {this.state.selectedOption == "prive" ? (

                        <Select
                          onChange={this.handleChangeNiveau}
                          value={this.state.valueNiveau}
                          options={levels}
                          isMulti
                          className="react-select"
                          placeholder="Sélectionnez le/les niveaux.."
                          classNamePrefix="react-select"
                          name="form-field-name"
                          required
                        />

                      ) : null}
                      <br></br>
                      {
                        this.state.valueNiveau.length > 0 && this.state.selectedOption == "prive" ? (

                          <Select
                            onChange={this.handleChangeClasse}
                            value={this.state.valueClasse}
                            options={classes}
                            isMulti
                            className="react-select"
                            placeholder="Sélectionnez le/les classes.."
                            classNamePrefix="react-select"
                            name="form-field-name"
                            required
                          />

                        ) : null}
                      <div className="boutons">
                        <Button type="submit" color="secondary" id="Eventenvoyer">
                          Envoyer
                    </Button>
                    &nbsp;&nbsp;&nbsp;{" "}
                        <Button type="reset" color="danger" id="Eventreset">
                          Annuler
                    </Button>
                      </div>
                    </Form>
                  )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>

      </Row>
    );
  }
}

export default Formevenement;
{/*
                    <FormGroup className="error-l-100">
                      <Label className="d-block">date validation </Label>
                    
                      <DatePicker
                        selected={this.state.startDateRange}
                        selectsStart
                        startDate={this.state.startDateRange}
                        endDate={this.state.endDateRange}
                        name="dateheure"
                        value={values.dateheure}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        placeholderText={"Du :"}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        dateFormat="DD/MM/YYYY HH:mm"
                        timeCaption="Temps"
                        locale="fr"
                      />
                      {errors.dateheure && touched.dateheure ? (
                        <div className="invalid-feedback d-block">
                          {errors.dateheure}
                        </div>
                      ) : null}
                      </FormGroup>
                    */}