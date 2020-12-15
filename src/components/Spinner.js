import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  center: {
    margin: 'auto',
    width: '50%',
    padding: '10px',
  }

}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root, classes.center}>
      <CircularProgress />
    </div>
  );
}
