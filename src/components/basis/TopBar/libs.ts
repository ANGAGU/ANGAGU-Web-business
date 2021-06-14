const TopBarLibs = {
  Logout: (e?: any, history?: any) => {
    if (localStorage.getItem('isAdmin') === 'true') {
      // 관리자이면
      history.push(`/Login`);
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
    } else {
      // 관리자 아니면
      history.push(`/Login`);
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
    }
    if (history) history.push('/Login');
  },
  goToRegister: (history: any, url: string) => {
    history.push(url);
  },
};

export default TopBarLibs;
