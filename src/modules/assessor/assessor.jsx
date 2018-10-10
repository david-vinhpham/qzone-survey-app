import React from 'react';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { registerUser } from "services/api/auth";
import { toggleLoading } from "services/api/assessment";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { eUserType } from '../../constants';

class Assessor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      userType: eUserType.assessor,
      open: false,
      password: "Test@2018"
    }
  }

  // componentWillMount(){
  //   var password = this.randomPassword(8);
  //   console.log(password)
  //   this.setState({password})
  // }

  // randomPassword(length) {
  //   var chars = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  //   var pass = "";
  //   for (var x = 0; x < length; x++) {
  //       var i = Math.floor(Math.random() * chars.length);
  //       pass += chars.charAt(i);
  //   }
  //   return pass;
  // }

  handleAssessor = () => {
    this.props.toggleLoading();
    this.props.registerUser(this.state, (response) => {
      if (response) {
        this.props.toggleLoading();
        if (response.status !== 201) {
          Alert.error(response.data.message, {
            position: 'bottom-right',
            effect: 'bouncyflip',
          });
        }
        else {
          Alert.success("Assessor Added successfully", {
            position: 'bottom-right',
            effect: 'bouncyflip',
          });
          this.setState({ open: false }, this.props.reloadAssessorList);
        }
      }
    });
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }


  render() {
    return (
      <React.Fragment>
        <Link to='#' style={{ fontWeight: 'bold' }} onClick={this.handleOpen} >Add Assessor</Link>
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Assessor</DialogTitle>
          <DialogContent>
            <GridContainer style={{ marginBottom: 10 }}>
              <GridItem md={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  label="Enter first name"
                  onChange={(event) => { this.setState({ firstname: event.target.value }) }}
                />
              </GridItem>
              <GridItem md={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Enter last name"
                  onChange={(event) => { this.setState({ lastname: event.target.value }) }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem md={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  label="Enter email"
                  onChange={(event) => { this.setState({ email: event.target.value }) }}
                />
              </GridItem>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Close
            </Button>
            <Button onClick={this.handleAssessor} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Alert stack={true} />
      </React.Fragment>
    )
  }
}

Assessor.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default compose(
  connect(null, { registerUser, toggleLoading })
)(Assessor);