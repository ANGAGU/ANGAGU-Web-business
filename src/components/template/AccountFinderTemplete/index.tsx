import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, ButtonGroup, Grid, Paper, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
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
    padding: '40px',
  },
  form: {
    paddingTop: '40px',
  },
  input: {
    display: 'block',
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
            <Button>아이디 찾기</Button>
            <Button>비밀번호 찾기</Button>
          </ButtonGroup>
        </Grid>
        <Grid item alignItems="center" justify="center" className={classes.form}>
          <TextField label="아이디" size="small" variant="outlined" className={classes.input} />

          <TextField label="이름" size="small" variant="outlined" className={classes.input} />

          <TextField label="생년월일" size="small" variant="outlined" className={classes.input} />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          {/* <Grid alignItems="center" justify="center" item xs={6} spacing={2}>
            <TextField id="outlined-basic" label="아이디" />
            <TextField id="outlined-basic" label="이름" />
            <TextField id="outlined-basic" label="생년월일" />
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default AccountFinderTemplate;
