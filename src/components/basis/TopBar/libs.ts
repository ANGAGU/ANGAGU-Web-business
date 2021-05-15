const TopBarLibs = {
  Logout: (e?: any, history?: any) => {
    console.log(history);
    if (localStorage.getItem('isAdmin')) {
      // 관리자이면
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      history.push(`/`);
    } else {
      // 관리자 아니면
      localStorage.removeItem('token');
      history.push(`/`);
    }
    if (history) history.push('/');
  },
  goToRegister: (history: any, url: string) => {
    history.push(url);
  },
};

export default TopBarLibs;
