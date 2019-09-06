import { useCookies } from 'react-cookie';

const [cookies, setCookie, removeCookie] = useCookies(['token']);

interface loginInterface {
  token: string
}

export const login = (props: loginInterface) => {
  if (!cookies.token) {
    setCookie('token', props.token);
  }
};

export const logOut = () => {
  removeCookie('token');
};