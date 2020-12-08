import React, { useCallback, useState } from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  FormGroup,
  Button,
  Text,
} from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import {
  Container,
  CardTitle,
  Form,
  FormContainer,
  BottomContent,
} from './styles';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

const Login = (): React.ReactElement => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    if (!email || !password) {
      addToast({
        type: 'error',
        title: 'Something Wrong',
        description: 'Check your credentials',
      });
      setIsLoading(false);
      return;
    }
    try {
      await signIn({
        email,
        password,
      });

      addToast({
        type: 'success',
        title: 'Success!',
        description: 'You will be redirected',
      });

      history.push('/');
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Something Wrong',
        description: 'An unexpected error happened',
      });
      setIsLoading(false);
    }
  }, [addToast, email, history, password, signIn]);

  return (
    <Container>
      <Card elevation={Elevation.FOUR}>
        <CardTitle>
          <h4>Login</h4>
        </CardTitle>
        <Form>
          <FormContainer>
            <FormGroup
              label="Enter your e-mail"
              labelFor="email"
              disabled={isLoading}
            >
              <InputGroup
                id="email"
                leftIcon="envelope"
                // @ts-ignore
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </FormGroup>
            <FormGroup
              label="Enter your password"
              labelFor="password"
              disabled={isLoading}
            >
              <InputGroup
                id="password"
                type="password"
                leftIcon="lock"
                value={password}
                // @ts-ignore
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
          </FormContainer>
        </Form>
        <BottomContent>
          <Button icon="log-in" text="Login" onClick={handleLogin} />
          <Text>Don't have a account?</Text>
          <Button text="Register" />
        </BottomContent>
      </Card>
    </Container>
  );
};

export default Login;
