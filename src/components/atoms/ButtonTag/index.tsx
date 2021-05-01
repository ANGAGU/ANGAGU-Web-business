import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { textSpanIntersectsWithPosition } from 'typescript';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const Buttons: React.FC<any> = text => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained">{text}</Button>
    </div>
  );
};

export default Buttons;
