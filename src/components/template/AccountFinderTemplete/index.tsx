import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

const useStyles = makeStyles(theme => ({
  frame: {
    height: '60%',
    width: '50%',
    position: 'absolute',
    top: '20%',
    left: '25%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '20px',
  },
  form: {
    paddingTop: '20px',
  },
}));

const AccountFinderTemplate: React.FC = () => {
  const [isPW, setIsPW] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        component="main"
        direction="column"
        alignItems="center"
        justify="flex-start"
        className={classes.frame}
      >
        <Grid direction="row" alignItems="center" justify="flex-end">
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button>아이디 찾기</Button>
            <Button>비밀번호 찾기</Button>
          </ButtonGroup>
        </Grid>
        <Grid item className={classes.form}>
          <Grid item xs={2} alignItems="center" justify="center" spacing={2}>
            <Paper variant="outlined" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AccountFinderTemplate;
