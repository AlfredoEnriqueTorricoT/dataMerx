import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const CheckPermission = ({ permissionName, children }) => {
  if (JSON.parse(localStorage.getItem("userPermission")).includes(permissionName))
    return (children)
}
class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();
  }

  componentDidMount() {
    this.initMenu();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  // componentDidUpdate() {}

  scrollElement = item => {
    setTimeout(() => {
      if (this.refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            if (this.refDiv.current)
              this.refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300;
          }
        }
      }
    }, 300);
  };

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      this.scrollElement(item);
      return false;
    }
    this.scrollElement(item);
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <SimpleBar className="h-100" ref={this.refDiv}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title dm-text-light">{this.props.t("Menu")}</li>
              <CheckPermission permissionName="cars">
                <li className="dm-link">
                  <Link to="/car">
                    <i className="fas fa-car dm-link-icon" />
                    <span>Vehículos</span>
                  </Link>
                </li>
              </CheckPermission>
              <CheckPermission permissionName="modems">
                <li className="dm-link">
                  <Link to="/modem">
                    <i className="fas fa-hdd dm-link-icon" />
                    <span>Módems</span>
                  </Link>
                </li>
              </CheckPermission>
              <CheckPermission permissionName="sims">
                <li className="dm-link">
                  <Link to="/sims">
                    <i className="fas fa-sim-card dm-link-icon" />
                    <span>Sims</span>
                  </Link>
                </li>
              </CheckPermission>
              <CheckPermission permissionName="watchs">
                <li className="dm-link">
                  <Link to="/watch">
                    <i className="fas fa-stopwatch dm-link-icon" />
                    <span>Relojes</span>
                  </Link>
                </li>
              </CheckPermission>
              <li className="dm-link">
                <Link to="/clients">
                  <i className="fas fa-users dm-link-icon" />
                  <span>Clientes</span>
                </Link>
              </li>
              {(JSON.parse(localStorage.getItem("userData"))).auth === 0 ?
                <li className="dm-link">
                  <Link to="/mark-modem">
                    <i className="fas fa-list dm-link-icon"></i>
                    <span>Marcas de módem</span>
                  </Link>
                </li>
                : ""}
              <CheckPermission permissionName="platforms">
                <li className="dm-link">
                  <Link to="/platform">
                    <i className="fas fa-city dm-link-icon"></i>
                    <span>Plataformas</span>
                  </Link>
                </li>
              </CheckPermission>
              <li className="dm-link">
                <Link to="/tags">
                  <i className="fas fa-tag dm-link-icon"></i>
                  <span>Tags</span>
                </Link>
              </li>

              <li className="dm-link">
                <Link to="#" className="has-arrow">
                  <i className="fas fa-file dm-link-icon"></i>
                  <span>Reportes</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li className="dm-link">
                    <Link to="/report_device">
                      <i className="fas fa-file dm-link-icon"></i>
                      <span>Modems</span>
                    </Link>
                    <Link to="/report_device_of_siguelo">
                      <i className="fas fa-file dm-link-icon"></i>
                      <span>Buscar por imei</span>
                    </Link>
                    <Link to="/platform_count">
                      <i className="fas fa-file dm-link-icon"></i>
                      <span>Conteo de plataformas</span>
                    </Link>
                  </li>
                </ul>
              </li>


              {(JSON.parse(localStorage.getItem("userData"))).auth === 0 ?
                <li className="dm-link">
                  <Link to="/users">
                    <i className="fas fa-user-tie dm-link-icon" />
                    <span>Usuarios</span>
                  </Link>
                </li>
                : ""}
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    );
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
};

export default withRouter(withTranslation()(SidebarContent));