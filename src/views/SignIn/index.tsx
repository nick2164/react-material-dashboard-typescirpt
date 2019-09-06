import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './useStyles';
import { postToken } from '../../hooks/managerAPI/tokens';
import { Redirect } from 'react-router';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://evercall.dk/">
        evercall ApS
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
};

const SignIn = () => {

  const [mainNumber, setMainNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  const onSubmit = () => {
    postToken(mainNumber, username, password).then(value => {


      if (value.data.token !== null) {
        localStorage.setItem('token', value.data.token);

        return <Redirect to={'/dashboard'}/>
      }


    });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <img
          alt="evercall ApS"
          className={classes.logoImage}
          src="/images/logos/evercall-logo 2013-ORIGINALLOGO - FLAT.svg"
        />
        <Typography component="h1" variant="h5">
          Manager log ind
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mainNumber"
            label="Hoved nummer"
            name="mainNumber"
            autoComplete="44404040"
            autoFocus
            onChange={e => setMainNumber(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Brugernavn"
            name="username"
            autoComplete="Bob"
            autoFocus
            onChange={e => setUsername(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary"/>}
            label="Husk mig"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Log ind
          </Button>
        </div>
      </div>
      <Copyright/>
    </Container>
  );
};

export default SignIn;