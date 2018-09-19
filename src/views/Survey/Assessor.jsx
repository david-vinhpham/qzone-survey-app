import React from 'react';
import { TextField,Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from "@material-ui/core";
import Button from "components/CustomButtons/Button.jsx";
import Alert from 'react-s-alert';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { registerUser } from "actions/auth.jsx";
import { connect } from 'react-redux';
import { compose } from 'redux';

class Assessor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      firstname:'',
      lastname:'',
      userType: 'ASSESSOR',
      open: false,
      password: "Survey@2019"
    }
    this.handleAssessor = this.handleAssessor.bind(this)
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

  handleAssessor(){
    this.props.registerUser(this.state, (response) =>{
      if(response){
        if (response.status !== 201 )
        {
          Alert.error(response.data.message, {
            position: 'bottom-right',
            effect: 'bouncyflip',
          });
        }
        else{
          Alert.success("Assessor Added successfully", {
            position: 'bottom-right',
            effect: 'bouncyflip',
          });
          this.props.reloadAssessorList()
          this.setState({open: false})
        }
      }
    })
  }

  handleClose = () =>{
    this.setState({open: false})
  }

  handleOpen = () =>{
    this.setState({open: true})
  }
  

  render() {
    return(
      <React.Fragment>
        <Link to='#' style={{fontFamily: 'sans-serif', fontWeight: 'bold'}} onClick={this.handleOpen} >Add Assessor</Link>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{"Add Assessor"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter details of new Assessor
            </DialogContentText>
            <div>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="firstName"
                    label="Enter First Name"
                    onChange={(event) =>{this.setState({firstname: event.target.value})}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="lastName"
                    label="Enter Last Name"
                    onChange={(event) =>{this.setState({lastname: event.target.value})}}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  <TextField
                    margin="dense"
                    id="email"
                    type="email"
                    label="Enter Email"
                    onChange={(event) =>{this.setState({email: event.target.value})}}
                  />
                </GridItem>
              </GridContainer>
            </div>
            <Alert stack={true}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} >
              Cancel
            </Button>
            <Button  onClick={this.handleAssessor} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

Assessor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(null,{registerUser})
)(Assessor);