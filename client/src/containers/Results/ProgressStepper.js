import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepIcon from '@material-ui/core/StepIcon';

import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const CustomStepIcon = withStyles(theme => ({
  root: {
    padding: '5px 10px 5px 10px',
    width: '1.2em',
    height: '1.2em',
  },
  completed: {
    color: '#7ed321 !important',
  },
}))(StepIcon);

const useStyles = withStyles(theme => ({
  root: {
    width: '100%',
    background: 'transparent',
  },
  button: {
    marginRight: 10,
  },
  backButton: {
    marginRight: 10,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    padding: '5px 10px 5px 10px',
    width: '1.2em',
    height: '1.2em',
  },
  iconCompleted: {
    color: '#7ed321 !important',
  },
}));

function getSteps() {
  return [
    'Create a challenge',
    'Create your pipeline benchmark (50)',
    'Building the model',
    'Visualize and monitor results',
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Create a challenge';
    case 1:
      return 'Create your pipeline benchmark (50 min)';
    case 2:
      return 'Building the model';
    case 3:
      return 'Visualize and monitor results';
    default:
      return 'Unknown step';
  }
}

const HorizontalNonLinearAlternativeLabelStepper = props => {
  const { classes, activeStep } = props;
  // const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  console.log(classes);
  function totalSteps() {
    return getSteps().length;
  }

  function isStepOptional(step) {
    return step === 1;
  }

  function skippedSteps() {
    return skipped.size;
  }

  function completedSteps() {
    return completed.size;
  }

  function isStepSkipped(step) {
    return skipped.has(step);
  }

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
    <div className={classes.root}>
      {/* Progress */}
      <Stepper nonLinear activeStep={activeStep} className={classes.root}>
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          if (isStepOptional(index)) {
            buttonProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              {...stepProps}
              className={{ completed: { color: '#F00' } }}
            >
              {index !== activeStep ? (
                <Tooltip title={label}>
                  <StepButton completed={index < activeStep}>
                    <StepLabel
                      StepIconProps={{
                        classes: {
                          root: classes.icon,
                          completed: classes.iconCompleted,
                        },
                      }}
                    />
                  </StepButton>
                  {/* <CustomStepIcon completed={index < activeStep} /> */}
                </Tooltip>
              ) : (
                <StepButton completed={isStepComplete(index)}>
                  <StepLabel
                    StepIconProps={{
                      classes: {
                        root: classes.icon,
                        completed: classes.iconCompleted,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </StepButton>
              )}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};
export default useStyles(HorizontalNonLinearAlternativeLabelStepper);
