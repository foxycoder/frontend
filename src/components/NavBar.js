import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BuildIcon from "@material-ui/icons/Build";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIndIcon from "@material-ui/icons/Description";
import Translate from "@material-ui/icons/Translate";
import { Link } from "react-router-dom";
import SwipeableDrawer from "material-ui/SwipeableDrawer";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import { ListItem, ListItemIcon } from "material-ui/List";
import { jwtPayload } from "../jwt";
import compose from "redux/src/compose";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { withStyles } from "material-ui";
import Button from "material-ui/Button";
import { withRouter } from "react-router";

const styles = {
  list: {
    width: 250
  },
  flex: {
    flex: 1
  },
  fullList: {
    width: "auto"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  nav: {
    width: "500px"
  }
};

class NavBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    auth: true,
    anchorEl: null,
    left: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open });
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleNewMenu = event => {
    this.setState({ El: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleNewClose = () => {
    this.setState({ El: null });
  };

  adminMenu = user => {
    if (user === "admin") {
      return (
        <div className={this.props.classes.nav}>
          <ListItem />
          <ListItem />

          <ListItem button="button">
            <StarIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/admin")}
            >
              Admin Page
            </Button>
          </ListItem>
          <ListItem button="button">
            <AssignmentIndIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/admin/pending")}
            >
              Pending User
            </Button>
          </ListItem>

          <ListItem button="button">
            <BuildIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/admin/users")}
            >
              User Administration
            </Button>
          </ListItem>

          <ListItem button="button">
            <SpeakerNotesIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/admin/orders")}
            >
              View All Orders
            </Button>
          </ListItem>
          <ListItem button="button">
            <DescriptionIndIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/admin/products")}
            >
              View All Products
            </Button>
          </ListItem>
          <ListItem button="button">
            <PermIdentityIcon />
            <Button
              color="inherit"
              onClick={() => this.props.history.push("/logout")}
            >
              Logout
            </Button>
          </ListItem>
          <ListItem />
          <ListItem>
            <img
              style={{ height: "80px", width: "150px" }}
              src="/images/logo.png"
              alt=""
            />
          </ListItem>
        </div>
      );
    }
  };

  render() {
    const {
      classes,
      currentUser,
      currentProfileId,
      currentProfileRole
    } = this.props;
    const { auth, anchorEl, El } = this.state;
    const open = Boolean(anchorEl);
    const openNew = Boolean(El);

    const { i18n } = this.props;

    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
    };

    const sideList = (
      <div className={classes.list}>
        <div className={this.props.classes.nav}>
          {this.adminMenu(currentProfileRole)}
          {currentProfileRole !== "admin" && (
            <div>
              <ListItem />
              <ListItem />
              <ListItem button="button">
                <StarIcon />
                <Button
                  color="inherit"
                  onClick={() => this.props.history.push("/Dashboard")}
                >
                  Dashboard
                </Button>
              </ListItem>
              <ListItem button="button">
                <AccountCircleIcon />
                <Button
                  color="inherit"
                  onClick={() =>
                    this.props.history.push(`/profiles/${currentProfileId}`)
                  }
                >
                  My profile
                </Button>
              </ListItem>

              <ListItem button="button">
                <LibraryBooksIcon />
                <Button
                  color="inherit"
                  onClick={() =>
                    this.props.history.push(
                      `/profiles/${currentProfileId}/products`
                    )
                  }
                >
                  My products
                </Button>
              </ListItem>

              <ListItem button="button">
                <ShopIcon />
                <Button
                  color="inherit"
                  onClick={() => this.props.history.push("/orders")}
                >
                  My orders
                </Button>
              </ListItem>

              <ListItem button="button">
                <ShoppingCartIcon />
                <Button
                  color="inherit"
                  onClick={() => this.props.history.push("/products")}
                >
                  Marketplace
                </Button>
              </ListItem>

              <ListItem button="button">
                <PermIdentityIcon />
                <Button
                  color="inherit"
                  onClick={() => this.props.history.push("/logout")}
                >
                  Logout
                </Button>
              </ListItem>
              <ListItem />
              <ListItem>
                <img
                  style={{ height: "80px", width: "150px" }}
                  src="/images/logo.png"
                  alt=""
                  onClick={() => this.props.history.push("/")}
                />
              </ListItem>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "white" }}>
          <Toolbar>
            <div>
              {currentUser && (
                <IconButton
                  float="left"
                  style={{ color: `#588D61` }}
                  onClick={this.toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <SwipeableDrawer
                className={classes.menuButton}
                open={this.state.left}
                onClose={this.toggleDrawer("left", false)}
                onOpen={this.toggleDrawer("left", true)}
              >
                <div
                  style={{ color: `#588D61` }}
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer("left", false)}
                  onKeyDown={this.toggleDrawer("left", false)}
                >
                  {sideList}
                </div>
              </SwipeableDrawer>
            </div>

            <Typography
              onClick={() => this.props.history.push("/dashboard")}
              variant="title"
              className={classes.flex}
              style={{ color: `#588D61`, fontSize: "30px" }}
            >
              AgroXchange
            </Typography>

            {auth && (
              <div>



                  <Button size="small" onClick={() => changeLanguage("en")}>
                    <img className="LanguageDetector" src="/images/en.svg" />
                  </Button>

                  <Button size="small" onClick={() => changeLanguage("es")}>
                    <img className="LanguageDetector" src="/images/es.svg" />
                  </Button>

              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = function(state) {
  const jwtDecoded = state.currentUser ? jwtPayload(state.currentUser.jwt) : {};
  return {
    currentUser: state.currentUser,
    currentUserId: jwtDecoded.id,
    currentProfileId: jwtDecoded.profileId,
    currentProfileRole: jwtDecoded.role
  };
};

export default compose(
  withRouter,
  translate("translations"),
  connect(mapStateToProps),
  withStyles(styles)
)(NavBar);
