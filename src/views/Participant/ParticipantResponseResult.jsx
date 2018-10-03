import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import listPageStyle from "assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx";
import { fetchSurvey } from "actions/survey.jsx";
import { fetchSurveyParticipantResponse } from "actions/surveyAnswer.jsx"
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Survey from 'survey-react';
import { sessionService } from 'redux-react-session';
import Button from "components/CustomButtons/Button.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import { Poll } from "@material-ui/icons";
import { fullName } from 'variables/FullName.jsx';

var surveyInfo = '';
var sid = ''
var pid = ''

class ParticipantResponseResult extends React.Component {
  componentWillMount() {
    sid = this.props.match.params.sid;
    pid = this.props.match.params.pid;
    //sessionService.loadUser().then(currentUser => {
    //  pid = currentUser.userId;
    //});
    sessionService.loadSession().then(currentSession => {
      this.props.fetchSurvey(sid, currentSession.token);
      this.props.fetchSurveyParticipantResponse(pid, sid, currentSession.token)
    })
  }

  render() {
    const { classes, survey: surveyDetail, participantAnswer, history } = this.props;
    if (!participantAnswer || !participantAnswer.questionAnswers || !surveyDetail || !surveyDetail.user)
      return <div>Participant is not associated with this survey</div>;
    else {
      const { title, description, survey, user } = surveyDetail;
      surveyInfo = new Survey.Model(survey);
      surveyInfo.mode = 'display';
      surveyInfo.data = JSON.parse(participantAnswer.questionAnswers)
      return (
        <div className={classes.content}>
          <div className={classes.container} style={{ width: '983px' }}>
            <GridContainer>
              <GridItem xs={12}>
                <Card>
                  <CardHeader color="primary" icon>
                    <CardIcon color="rose">
                      <Poll />
                    </CardIcon>
                    <h3 className={classes.cardIconTitle}>Assessments result</h3>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <h4>Title:</h4>
                      </GridItem>
                      <GridItem xs={12} sm={7}>
                        <h4>{title}</h4>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <h4>Logo:</h4>
                      </GridItem>
                      <GridItem xs={12} sm={7}>
                        <img src={surveyDetail.logo} alt="survey logo" />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <h4>Description:</h4>
                      </GridItem>
                      <GridItem xs={12} sm={7}>
                        <h4>
                          {description}
                        </h4>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={3}>
                        <h4>Assessor:</h4>
                      </GridItem>
                      <GridItem xs={12} sm={7}>
                        <h4>
                          {fullName(user)}
                        </h4>
                      </GridItem>
                    </GridContainer>
                    <hr />
                    <GridContainer>
                      <GridItem xs={12} sm={10}>
                        <Survey.Survey model={surveyInfo} />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter className={classes.justifyContentCenter}>
                    <Button
                      color="rose"
                      onClick={() => { history.push(`/participants/survey/survey-answers`); }}
                    >
                      Go To Participant List
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      )
    }
  }
}

ParticipantResponseResult.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { survey: state.surveys.detail, participantAnswer: state.surveyParticipantAnswer.data }
}

export default compose(
  withStyles(listPageStyle),
  connect(mapStateToProps, { fetchSurvey, fetchSurveyParticipantResponse }),
)(ParticipantResponseResult);

