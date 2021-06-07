import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps, useLocation, Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import api from 'api';
import { notify } from 'App';

import './style.css';
import { Card, CardActions, CardContent, makeStyles, Typography, TextField, Button } from '@material-ui/core';
import { faHandHolding } from '@fortawesome/free-solid-svg-icons';

type Question = {
  id: number;
  answer: string | null;
  answer_time: string;
  title: string;
  content: string;
  product_id: number;
  product_name: string;
  customer_id: number;
  customer_name: string;
  create_time: string;
  update_time: string;
};
type QnADetailProps = {
  que: Question;
};

const QnADetailTemplate: React.FC<RouteComponentProps> = ({ match }) => {
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 400,
      height: '95%',
      borderRadius: '20px',
      padding: '20px 40px',
      boxShadow: 'none',
      backgroundColor: '#f9f9f9',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    product: {
      fontSize: 14,
    },
    info: {
      marginBottom: 12,
      textAlign: 'right',
    },
    content: {
      marginTop: '40px',
    },

    answer: {
      width: '100%',
      marginTop: '20px',
    },
  });

  const questionProps = useLocation();
  const [question, setQuestion] = useState({
    id: 0,
    answer: null,
    answer_time: '',
    title: '',
    content: '',
    product_id: 0,
    customer_id: 0,
    customer_name: '',
    product_name: '',
    create_time: '',
    update_time: '',
  } as Question);
  const [answer, setAnswer] = useState('' as string);
  const classes = useStyles();

  const updateAnswer = async () => {
    api.setAxiosDefaultHeader();
    const result = await api.post(`/company/board/${question.id}`, { answer });
    if (result.status === 'success') {
      notify('답변 등록이 완료되었습니다!');
    } else {
      console.error('답변 등록 실패');
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setAnswer(value);
  };

  useEffect(() => {
    const questionTemp = questionProps.state as QnADetailProps;
    setQuestion(questionTemp.que);
  }, []);
  return (
    <Fade>
      <Container className="answer-page">
        <h3>상품문의 상세</h3>
        <hr />
        <Card className={classes.root}>
          <CardContent>
            {/* <img style={{ width: '50px', margin: '10px 0' }} alt="" src={userImg} /> */}
            <Link
              to={{
                pathname: `/Main/Product/${question.product_id}`,
              }}
            >
              <Typography className={classes.product} color="textSecondary" gutterBottom>
                {question.product_name}
              </Typography>
            </Link>
            <Typography variant="h6" component="h6">
              {/* <span style={{ marginLeft: '0px' }} className="company-name content-highlight">
                사용자
              </span> */}
              {question.title}
            </Typography>
            <Typography className={classes.info} color="textSecondary">
              {question.customer_name} | {question.create_time.substr(0, 10)}
            </Typography>
            <hr />
            <Typography className={classes.content} color="textSecondary">
              {question.content}
            </Typography>
          </CardContent>
        </Card>
        <div className={classes.content}>
          <Typography style={{ float: 'left' }} variant="h6" component="h6">
            답변 남기기
          </Typography>

          <Button style={{ float: 'right', marginLeft: '8px' }} variant="outlined" onClick={updateAnswer}>
            {question.answer === null ? '등록하기' : '수정하기'}
          </Button>
          {question.answer !== null && (
            <Button style={{ float: 'right' }} variant="outlined" onClick={updateAnswer}>
              삭제하기
            </Button>
          )}
          <TextField
            className={classes.answer}
            id="outlined-multiline-static"
            label="문의 답변"
            multiline
            rows={4}
            defaultValue={question.answer}
            onChange={handleOnChange}
            variant="outlined"
          />
        </div>
      </Container>
    </Fade>
  );
};

export default QnADetailTemplate;
