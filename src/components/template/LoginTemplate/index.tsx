import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch, useHistory } from 'react-router-dom';
import './style.css';
import { getLogin } from './libs';
import api from '../../../api';

const useStyles = makeStyles(theme => ({
  root: {
    height: '80%',
    width: '70%',
    position: 'absolute',
    top: '10%',
    left: '15%',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)', // 여기에 이미지
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 0px 0px 20px',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    borderRadius: '0px 20px 20px 0px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginTemplate: React.FC = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const title =
    Object.keys(match.params).length === 0 ? '로그인' : Object.keys(match.params)[0];

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        className={classes.main}
        elevation={6}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => {
                setId(`${e.target.value}`);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                setPw(`${e.target.value}`);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                getLogin(title, api, id, pw, history);
              }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={`/Main`} variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href={`/Login/Signup`} variant="body2">
                  {'아이디가 없으신가요? 회원가입'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginTemplate;
