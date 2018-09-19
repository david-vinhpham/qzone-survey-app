import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { dashboardRoutes, otherRoutes } from "routes/dashboard.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Header from "components/Header/Header.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import { compose } from 'redux';
import logo from "assets/img/logo-white.svg";
import {checkAuth} from 'actions/auth';
import { connect } from 'react-redux';

const switchRoutes = (
  <Switch>
    {[...otherRoutes, ...dashboardRoutes].map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);
var ps;
class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mobileOpen: false,
      miniActive: false,
      isLoggedIn: true
    };
  }
 
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }

  componentWillMount(){
    this.props.checkAuth('abc',response=>{
      if (response===false)
        this.setState({isLoggedIn: false})
    });
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if(this.state.mobileOpen){
        this.setState({mobileOpen: false})
      }
    }
  }

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });

    if (!this.state.isLoggedIn) {
      return( 
        <div className={mainPanel} ref="mainPanel">
          <Redirect
            to={{
              pathname: "/login",
              state: { from: this.props.location.pathname }
            }}
          />
        </div>
      )
    }

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Survey"}
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div> 
        </div>   
      </div>
    )
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(appStyle),
  connect(null,{checkAuth})
)(Dashboard);