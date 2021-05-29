/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, ButtonGroup, Grid, Paper, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../api';

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: '40px',
  },
  input: {
    display: 'block',
  },
  submit: {
    position: 'relative',
    top: '100px',
    display: 'block',
    // marginTop: '70px',
  },
}));
type AccountFinderProps = {
  isPW: boolean;
};
const AccountFinderForm: React.FC<AccountFinderProps> = ({ isPW }) => {
  const history = useHistory();
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2000-01-01T21:11:54'));
  const classes = useStyles();

  useEffect(() => {
    console.log('te');
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
    <Grid item alignItems="center" justify="center" className={classes.form}>
      {isPW ? <TextField label="아이디" fullWidth className={classes.input} /> : null}
      <TextField label="이름" fullWidth className={classes.input} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          label="생년월일"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
        {'비밀번호 찾기'}
      </Button>
    </Grid>
  );
};
const visStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
};
export default AccountFinderForm;
