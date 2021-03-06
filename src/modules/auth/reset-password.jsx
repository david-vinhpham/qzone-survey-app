import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText,
} from '@material-ui/core';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Button from 'components/CustomButtons/Button';
import { resetPassword } from 'services/api/auth';
import ChangePassword from 'modules/auth/change-password';
import CustomInput from 'components/CustomInput/CustomInput';
import { classesType } from 'types/global';
import validateEmail from '../../utils/validateEmail';

class ResetPassword extends React.Component {
  static propTypes = {
    classes: classesType.isRequired,
    resetPassword: PropTypes.func.isRequired,
  }

  defaultState = {
    email: '',
    emailState: false,
    open: false,
    openChangePassword: false,
  }

  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
  }

  handleResetPassword = () => {
    const { resetPassword: resetPasswordAction } = this.props;
    resetPasswordAction(this.state, (response) => {
      if (response.status === 200) {
        this.setState({ open: false, openChangePassword: true });
        Alert.success('Code is successfully send to your email', { effect: 'bouncyflip' });
      } else {
        Alert.error(response.data.message, { effect: 'bouncyflip' });
      }
    });
  }

  handleClose = () => {
    this.setState(this.defaultState);
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
      emailState: validateEmail(event.target.value) ? 'success' : 'error',
    });
  }

  render() {
    const { classes } = this.props;
    const {
      open, emailState, openChangePassword, email,
    } = this.state;

    return (
      <React.Fragment>
        <div className={classes.justifyContentEnd}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link to="#" onClick={this.handleOpen}>
              <h5 className={classNames(classes.alertLink, classes.noMarginTop)}>
                forgot password?
              </h5>
            </Link>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please enter your email to reset password
            </DialogContentText>
            <div>
              <CustomInput
                labelText="Enter email"
                success={emailState === 'success'}
                error={emailState === 'error'}
                id="email"
                formControlProps={{ fullWidth: true }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: 'email',
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>
              Close
            </Button>
            <Button onClick={this.handleResetPassword} color="rose">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ChangePassword
          openChangePassword={openChangePassword}
          closeChangePassword={this.handleClose}
          email={email}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, { resetPassword })(ResetPassword);
