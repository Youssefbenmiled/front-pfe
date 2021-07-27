import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";
import { Separator, Colxx } from "../../components/common/CustomBootstrap";
import { injectIntl } from "react-intl";
import CommentWithLikes from "../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../data/app/comments";
import { items } from "../../data/carouselItems";
import GlideComponent from "../../components/carousel/GlideComponent";
import { NavLink } from "react-router-dom";
import axios from "axios";

const NoControlCarouselItem = ({ title, img, detail, badges, toens }) => {
  return (
    <div className="glide-item">
      <NavLink
        to={toens}
        location={{}}
      >
        <Card>
          <div className="position-relative">
            <img className="card-img-top" src={img} alt={title} />
            {badges &&
              badges.map((b, index) => {
                return (
                  <span
                    key={index}
                    className={`badge badge-pill badge-${
                      b.color
                      } position-absolute ${
                      index === 0
                        ? "badge-top-left"
                        : "badge-top-left-" + (index + 1)
                      }`}
                  >
                    {b.title}
                  </span>
                );
              })}
          </div>
          <CardBody>
            <h6 className="mb-4">{title}</h6>
            <footer>
              <p className="text-muted text-small mb-0 font-weight-light">
                {detail}
              </p>
            </footer>
          </CardBody>
        </Card>
      </NavLink>
    </div>
  );
};
class Accueil extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
      com: "",
      list: commentWithLikesData,
      modif: false,
      supp: false,
      data: null
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }
  handleChange = (event) => {
    this.setState({ com: event.target.value })
  }
  handleCom = (e) => {
    e.preventDefault()
    let com = this.state.com
    if (com.trim() !== "") {
      this.state.list.push({
        name: "admin",
        detail: this.state.com,
        date: 'Five days ago',
        thumb: '/assets/img/profile-pic-l-7.jpg',
        likes: 0,
        key: Math.random(),
        edit: null
      })
      this.setState({ com: "" })
    }


  }

  componentWillUpdate() {
    this.state.list.map((item, index) => {
      if (item.name == "admin") {
        item.edit = true
      } else {
        item.edit = false
      }
    })

  }
  componentDidUpdate() {
    const index = this.state.list.indexOf(this.state.data);
    if (index > -1 && this.state.supp == true) {
      this.state.list.splice(index, 1)
      this.setState({ supp: false })
    }
    if (index > -1 && this.state.modif == true) {
      this.state.list.splice(index, 1)
      this.setState({ modif: false })
      this.setState({ com: this.state.data.detail })
    }
  }
  componentDidMount() {


    this.state.list.map((item, index) => {
      if (item.name == "admin") {
        item.edit = true
      } else {
        item.edit = false
      }
    })
  }




  setModif = (modif, data) => {
    this.setState({ modif, data })

  }
  setSupp = (supp, data) => {
    this.setState({ supp, data })
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };


  render() {
    const { messages } = this.props.intl;
    const { com, list, modif, supp } = this.state
    return (
      <Fragment>
        <Row>


          <Colxx xxs="12" className="pl-0 pr-0 mb-5">
            <GlideComponent
              settings={{
                gap: 5,
                perView: 3,
                type: "carousel",
                breakpoints: {
                  480: { perView: 1 },
                  800: { perView: 2 },
                  1200: { perView: 3 }
                },
                hideNav: true
              }}
            >
              {items.map(item => {
                return (
                  <div key={item.id}>
                    <NoControlCarouselItem {...item} />
                  </div>
                );
              })}
            </GlideComponent>
          </Colxx>

          <Colxx xxs="12">


            <Row className="slider">
              <Colxx xxs="12" xl="8" className="col-left" id="accueil">
                <TabContent activeTab={this.state.activeFirstTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Colxx sm="12">
                        <br></br>
                        <br></br>

                        <br></br>
                        <br></br>
                        {
                          list.map((item, index) => {
                            return (<Row >
                              <Colxx xxs="12" className="mb-4">
                                <Card className="mb-4" >
                                  <CardBody >

                                    <CommentWithLikes
                                      data={item}
                                      key={item.key}
                                      edit={item.edit}
                                      setSupp={this.setSupp}
                                      setModif={this.setModif}>

                                    </CommentWithLikes>

                                  </CardBody>

                                </Card>
                              </Colxx>
                            </Row>)
                          })}
                        {/* <form onSubmit={this.handleCom} id="formaccueil">
                          <InputGroup className="comment-contaiener">
                            <Input value={com} placeholder="Que voulez vous dire ?" onChange={this.handleChange} />
                            <InputGroupAddon addonType="append">
                              <Button color="primary"  >
                                <span className="d-inline-block">{messages["pages.send"]}</span> <i className="simple-icon-arrow-right ml-2"></i>
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </form> */}
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Colxx>

            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
export default injectIntl(Accueil);
