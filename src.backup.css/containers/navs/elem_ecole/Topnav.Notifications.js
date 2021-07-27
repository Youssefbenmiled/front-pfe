import React, { Component } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import notifications from "../../../data/ecole/notifications";



class Notifs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      afficher: true
    }
  }
  test = () => {
    this.setState({ afficher: false })
  }
  render() {
    const NotificationItem = ({ img, title, date }) => {
      return (
        <div className="d-flex flex-row mb-3 pb-3 border-bottom">
          <a href="/app/pages/details">
            <img
              src={img}
              alt={title}
              className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
            />
          </a>
          <div className="pl-3 pr-2">
            <a href="/app/pages/details">
              <p className="font-weight-medium mb-1">{title}</p>
              <p className="text-muted mb-0 text-small">{date}</p>
            </a>
          </div>
        </div>
      );
    };
    const { afficher } = this.state
    return (
      <div className="position-relative d-inline-block">
        <UncontrolledDropdown className="dropdown-menu-right">
          <DropdownToggle
            className="header-icon notificationButton"
            color="empty"
          >
            <i className="simple-icon-bell" onClick={this.test}
            />
            {afficher ?
              <span className="count"
              >
                {notifications.length}
              </span>
              : null}
          </DropdownToggle>
          <DropdownMenu
            className="position-absolute mt-3 scroll"
            right
            id="notificationDropdown"
          >
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {notifications.map((notification, index) => {
                return <NotificationItem key={index} {...notification} />;
              })}
            </PerfectScrollbar>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

export default Notifs;

// const TopnavNotifications = () => {
//   return (
//     <div className="position-relative d-inline-block">
//       <UncontrolledDropdown className="dropdown-menu-right">
//         <DropdownToggle
//           className="header-icon notificationButton"
//           color="empty"
//         >
//           <i className="simple-icon-bell" />
//           <span className="count" 
//           onClick={this.test}
//           >{notifications.length}</span>
//         </DropdownToggle>
//         <DropdownMenu
//           className="position-absolute mt-3 scroll"
//           right
//           id="notificationDropdown"
//         >
//           <PerfectScrollbar
//             option={{ suppressScrollX: true, wheelPropagation: false }}
//           >
//             {notifications.map((notification, index) => {
//               return <NotificationItem key={index} {...notification} />;
//             })}
//           </PerfectScrollbar>
//         </DropdownMenu>
//       </UncontrolledDropdown>
//     </div>
//   );
// };

// export default TopnavNotifications;
