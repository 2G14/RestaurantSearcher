import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Form from "./Form";
import RestaurantList from "./content/List/RestaurantList";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    background: "deeppink"
  },
  content: {
    flexGrow: 1,
    padding: 0 //theme.spacing.unit * 3
  },
  gnaviCredit: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center"
  }
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileOpen: false,
      json: { rest: [] },
      searchConditions: {
        latitude: 0,
        longitude: 0,
        range: 2,
        hit_per_page: 25,
        offset_page: 1,
        freeword: ""
      }
    };
    this.menuToggle = this.menuToggle.bind(this);
    this.setJson = this.setJson.bind(this);
    this.setSearchConditions = this.setSearchConditions.bind(this);
  }
  /**
   * メニュー形体
   */
  menuToggle() {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  }
  /**
   * ぐるなびAPIのjson形式のレスポンスを保存
   */
  setJson(json) {
    this.setState({ json: json });
  }
  /**
   * 検索条件を保存
   * @param {*} searchConditions
   */
  setSearchConditions(searchConditions) {
    this.setState({ searchConditions: searchConditions });
  }
  /**
   * レンダー
   */
  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <Form
          setJsonFunc={this.setJson}
          searchConditions={this.state.searchConditions}
          setSearchConditions={this.setSearchConditions}
        />
        <Divider />
        {/* ぐるなび */}
        <a
          href="https://api.gnavi.co.jp/api/scope/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.gnaviCredit}
        >
          <img
            src="https://api.gnavi.co.jp/api/img/credit/api_225_100.gif"
            width="225"
            height="100"
            border="0"
            alt="グルメ情報検索サイト　ぐるなび"
          />
        </a>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar color="secondary" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.menuToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Restaurant
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Nav */}
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.menuToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        {/* Main */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <RestaurantList
            json={this.state.json}
            searchConditions={this.state.searchConditions}
            setJsonFunc={this.setJson}
          />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
