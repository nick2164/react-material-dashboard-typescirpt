import { AxiosResponse } from 'axios';

interface responseInterface {
  response: AxiosResponse
}

const ResponseHandler = (props: responseInterface) => {

  switch (props.response.status) {
    case 200:
      console.log('Success');
      break;
    case 201:
      console.log('Created');
      break;
    case 202:
      console.log('Accepted');
      break;
    case 204:
      console.log('No Content');
      break;

    case 401:
      console.log('Unauthorized');
      logout();
      break;
    default:
      console.log('Some other Response', props.response);
  }

};

const logout = () => {

  localStorage.setItem('token', 'null');

};

export default ResponseHandler;
