import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { Fade } from 'react-awesome-reveal';
import { CompanyAdjustForm } from 'components/organisms';

import './style.css';
import { Card, CardActions, CardContent, makeStyles, Typography, TextField, Button } from '@material-ui/core';

const QnADetailTemplate: React.FC = () => {
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

  const classes = useStyles();
  return (
    <Fade>
      <Container className="answer-page">
        <h3>상품문의 상세</h3>
        <hr />
        <Card className={classes.root}>
          <CardContent>
            {/* <img style={{ width: '50px', margin: '10px 0' }} alt="" src={userImg} /> */}
            <Typography className={classes.product} color="textSecondary" gutterBottom>
              상품 이름
            </Typography>
            <Typography variant="h6" component="h6">
              {/* <span style={{ marginLeft: '0px' }} className="company-name content-highlight">
                사용자
              </span> */}
              상품 문의 제목
            </Typography>
            <Typography className={classes.info} color="textSecondary">
              사용자 정보 | 등록 날짜
            </Typography>
            <hr />
            <Typography className={classes.content} color="textSecondary">
              상품 문의 내용입니다아아아아.
            </Typography>
          </CardContent>
        </Card>
        <div className={classes.content}>
          <Typography style={{ float: 'left' }} variant="h6" component="h6">
            답변 남기기
          </Typography>
          <Button style={{ float: 'right' }} variant="outlined">
            등록하기
          </Button>
          <TextField
            className={classes.answer}
            id="outlined-multiline-static"
            label="문의 답변"
            multiline
            rows={4}
            defaultValue="문의에 대한 답변을 달아주세요:)"
            variant="outlined"
          />
        </div>
      </Container>
    </Fade>
  );
};

export default QnADetailTemplate;
