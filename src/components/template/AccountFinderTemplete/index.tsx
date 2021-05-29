import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, ButtonGroup, Grid, Paper, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { AccountFinderForm } from '../../organisms';
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
    padding: '40px',
  },
}));

const AccountFinderTemplate: React.FC = () => {
  const [isPW, setIsPW] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2000-01-01T21:11:54'));
  const classes = useStyles();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

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
            <Button variant={!isPW ? 'contained' : 'outlined'} onClick={() => setIsPW(false)}>
              아이디 찾기
            </Button>
            <Button variant={isPW ? 'contained' : 'outlined'} onClick={() => setIsPW(true)}>
              비밀번호 찾기
            </Button>
          </ButtonGroup>
        </Grid>
        <AccountFinderForm isPW={isPW} />
      </Grid>
    </>
  );
};

export default AccountFinderTemplate;
