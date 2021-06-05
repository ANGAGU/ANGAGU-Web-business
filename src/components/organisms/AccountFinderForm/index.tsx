/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { notify } from 'App';
import api from 'api';
import { ConfirmModal } from '../../molecules';

const useStyles = makeStyles(theme => ({
  form: {
    paddingTop: '40px',
    width: '223px',
  },
  innerForm: {
    minWidth: '223px',
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
    top: '60px',
    display: 'block',
    textAlign: 'center',
  },
  textBlk: {
    paddingTop: '30px',
  },
  text: {
    color: 'blue',
  },
  loginBtn: {
    paddingTop: '12px',
  },
}));

type UserInfo = {
  email: string;
  phone_number: string;
  name: string;
};
type NewPassword = {
  password: string;
  passwordConfirm: string;
};

type AccountFinderProps = {
  isPW: boolean;
};
const AccountFinderForm: React.FC<AccountFinderProps> = ({ isPW }) => {
  const history = useHistory();
  const [authToken, setAuthToken] = useState('' as string);
  const [submitValue, setSubmitValue] = useState({} as UserInfo);
  const [isResult, setIsResult] = useState(false as boolean);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date('2000-01-01T21:11:54'));
  const [viewModal, setViewModal] = useState(false as boolean);
  const [authCode, setAuthCode] = useState('' as string);
  const [findEmail, setFindEmail] = useState('' as string);
  const [newPassword, setNewPassword] = useState({} as NewPassword);

  const classes = useStyles();

  useEffect(() => {
    setIsResult(false);
  }, [isPW]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setSubmitValue({ ...submitValue, [name]: value });
  };

  const handleOnChangeForPassword = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setNewPassword({ ...newPassword, [name]: value });
  };

  const submitUserInfo = async (evt: React.FormEvent<EventTarget>) => {
    evt.preventDefault();
    api.setHeaderVerification(authToken);
    let endpoint = '/company/find/id';
    if (isPW) endpoint = '/company/find/pw';
    const { status, data } = await api.get(endpoint, {
      name: submitValue.name,
      phone_number: submitValue.phone_number,
      email: submitValue.email,
      code: authCode,
    });
    if (status === 'success') {
      alert('OK!');
      if (!isPW) setFindEmail(data.email);
      else setAuthToken(data.token);
      setIsResult(true);
    } else {
      console.log('fail to find id/pw');
    }
  };
  const requestAuthNumber = async () => {
    const { status, data } = await api.post('/company/find/code', {
      phone_number: submitValue.phone_number,
    });
    if (status === 'success') {
      alert('OK!');
    } else {
      console.log('fail for send sms');
    }
    toggleModal();
  };

  const changeNewPassword = async () => {
    api.setHeaderVerification(authToken);
    const { status, data } = await api.put('/company/find/pw', {
      newPw: newPassword.password,
    });
    if (status === 'success') {
      notify('비밀번호 변경 완료!');
      history.push('/Login');
    } else {
      console.log('fail for change pw');
    }
  };

  const toggleModal = () => {
    setViewModal(!viewModal);
  };

  const Finder = () => (
    <Grid item alignItems="center" justify="center" className={classes.form}>
      <TextField
        label="이름"
        name="name"
        defaultValue={submitValue.name}
        onChange={handleOnChange}
        fullWidth
        className={classes.input}
      />
      {isPW ? (
        <TextField
          label="아이디"
          name="email"
          defaultValue={submitValue.email}
          onChange={handleOnChange}
          fullWidth
          className={classes.input}
        />
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            name="birthday"
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
          name="phone_number"
          fullWidth
          defaultValue={submitValue.phone_number}
          onChange={handleOnChange}
          className={classes.input}
        />
        <Button
          style={{ flex: '1', float: 'right', height: '36px', marginLeft: '10px' }}
          variant="outlined"
          onClick={requestAuthNumber}
        >
          전송
        </Button>
      </div>
      <ConfirmModal
        viewModal={viewModal}
        phoneNumber={submitValue.phone_number}
        type={isPW ? 'pw' : 'id'}
        setAuthToken={setAuthToken}
        toggleModal={toggleModal}
        setCode={setAuthCode}
      />
      <div className={classes.submit}>
        {isPW ? (
          <Button onClick={submitUserInfo} fullWidth type="submit" variant="contained" color="primary">
            비밀번호 찾기
          </Button>
        ) : (
          <Button
            onClick={submitUserInfo}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            // className={classes.submit}
          >
            아이디 찾기
          </Button>
        )}
        <Link to="/Login">
          <Typography className={classes.loginBtn} variant="body2" color="textSecondary">
            로그인으로 돌아가기
          </Typography>
        </Link>
      </div>
    </Grid>
  );

  const FinderResult = () => (
    <Grid item alignItems="center" justify="center" className={classes.form}>
      <Grid item alignItems="center" justify="center" className={classes.innerForm}>
        <div className={classes.textBlk}>
          {!isPW ? (
            <>
              <div>아이디는</div> <div>{findEmail} 입니다.</div>
              <Link to="/Login">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  로그인으로 돌아가기
                </Button>
              </Link>
            </>
          ) : (
            <>
              <TextField
                label="비밀번호"
                name="password"
                type="password"
                defaultValue={newPassword.password}
                onChange={handleOnChangeForPassword}
                fullWidth
                className={classes.input}
              />
              <TextField
                label="비밀번호 확인"
                name="passwordConfirm"
                type="password"
                defaultValue={newPassword.passwordConfirm}
                onChange={handleOnChangeForPassword}
                fullWidth
                className={classes.input}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={changeNewPassword}
              >
                비밀번호 재설정
              </Button>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );

  return <>{isResult ? FinderResult() : Finder()}</>;
};

export default AccountFinderForm;
