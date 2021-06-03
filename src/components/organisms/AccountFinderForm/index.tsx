/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, ButtonGroup, Grid, Paper, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { FindInPageTwoTone } from '@material-ui/icons';
import api from '../../../api';

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: '40px',
    width: '223px',
  },
  innerForm: {
    minWidth: '250px',
    height: '130px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  input: {
    display: 'block',
    margin: 0,
    paddingBottom: '20px',
  },
  submit: {
    position: 'relative',
    top: '70px',
    display: 'block',
    // marginTop: '70px',
  },
  textBlk: {
    paddingTop: '30px',
  },
  text: {
    color: 'blue',
  },
}));
type AccountFinderProps = {
  isPW: boolean;
};
const AccountFinderForm: React.FC<AccountFinderProps> = ({ isPW }) => {
  const history = useHistory();
  const [isResult, setIsResult] = useState(false as boolean);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2000-01-01T21:11:54'));
  const classes = useStyles();

  useEffect(() => {
    console.log('te');
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const findID = () => {
    console.log('ddd');
    setIsResult(true);
  };
  const findPW = () => {
    console.log('ddfd');
    setIsResult(true);
  };
  const Finder = () => (
    <Grid item alignItems="center" justify="center" className={classes.form}>
      <TextField label="이름" fullWidth className={classes.input} />
      {isPW ? (
        <TextField label="아이디" fullWidth className={classes.input} />
      ) : (
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
            className={classes.input}
          />
        </MuiPickersUtilsProvider>
      )}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          style={{ flex: '4', float: 'left' }}
          label="휴대폰 번호"
          fullWidth
          className={classes.input}
        />
        <Button style={{ flex: '1', float: 'right', height: '36px', marginLeft: '10px' }} variant="outlined">
          전송
        </Button>
      </div>

      {isPW ? (
        <Button
          onClick={findPW}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          비밀번호 찾기
        </Button>
      ) : (
        <Button
          onClick={findID}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          아이디 찾기
        </Button>
      )}
    </Grid>
  );

  const FinderResult = () => (
    <Grid item alignItems="center" justify="center" className={classes.form}>
      <Grid item alignItems="center" justify="center" className={classes.innerForm}>
        <div className={classes.textBlk}>
          <div>{isPW ? '비밀번호는' : '아이디는'}</div> <div>pyi7628@dummy.dummy 입니다.</div>
        </div>
      </Grid>
      <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
        로그인으로 돌아가기
      </Button>
    </Grid>
  );

  return <>{isResult ? FinderResult() : Finder()}</>;
};

export default AccountFinderForm;
