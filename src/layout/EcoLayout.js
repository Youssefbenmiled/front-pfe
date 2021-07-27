import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/elem_ecole/Topnav";
import Sidebar from "../containers/navs/elem_ecole/Sidebar";
class EcoLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
          <div className="container-fluid">{this.props.children}</div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(EcoLayout)
);
