import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { History } from 'history';

interface Authentication {
  children: any[],
  location: History
}

const notAllowedReturnValue = (<Redirect to={'/sign-in'} />);

const Authentication = (props: Authentication) => {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const defaultReturnValue = (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );


  const [returnValue, setReturnValue] = useState(defaultReturnValue);

  useEffect(() => {

    const localStorageToken = localStorage.getItem('token');

    if (localStorageToken === null || localStorageToken === 'null') {

      if (token !== localStorageToken)
        setToken(localStorageToken);
      setReturnValue(notAllowedReturnValue);
    } else {
      setReturnValue(defaultReturnValue);
    }

  }, [props.location]);

  return (returnValue);

};

export default Authentication;
