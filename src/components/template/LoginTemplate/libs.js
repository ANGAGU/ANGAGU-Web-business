// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const getLogin = async (titleType, api, id, pw, history) => {
  try {
    console.log(id, pw);
    if (titleType === '로그인') {
      // 기업 로그인
      const result = await api.post('/customer/login', {
        email: id,
        password: pw,
      });
      if (result.status === 'success') {
        // eslint-disable-next-line no-alert
        alert('관리자 로그인 성공');
        localStorage.setItem('token', result.data.token);
      } else {
        console.log(result);
      }
    } else {
      const result = await api.post('/admin/login', {
        email: id,
        password: pw,
      });
      if (result.status === 'success') {
        // eslint-disable-next-line no-alert
        alert('관리자 로그인 성공');
      } else {
        console.log(result);
      }
    }
  } catch (err) {
    history.push('/Main');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const findPw = async history => {
  try {
    // 여기에 비밀번호 찾기 페이지 필요
    history.push('/Main');
  } catch (err) {
    history.push('/Main');
  }
};

export { getLogin, findPw };
