import React, { useCallback, useState } from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  FormGroup,
  Button,
  Text,
} from '@blueprintjs/core';
import { useHistory, Link } from 'react-router-dom';
import {
  Container,
  CardTitle,
  Form,
  FormContainer,
  BottomContent,
} from './styles';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';

const Register = (): React.ReactElement => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();
  const history = useHistory();

  const signUp = useCallback(async () => {
    const response = await api.post('/users', {
      email,
      password,
      name,
    });
  }, [email, name, password]);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    if (!email || !password || !name) {
      addToast({
        type: 'error',
        title: 'Something Wrong',
        description: 'Check your credentials',
      });
      setIsLoading(false);
      return;
    }
    try {
      await signUp();

      addToast({
        type: 'success',
        title: 'Success!',
        description: 'You will be redirected to login',
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
  }, [addToast, email, history, name, password, signUp]);

  return (
    <Container>
      <Card elevation={Elevation.FOUR}>
        <CardTitle>
          <h4>Register</h4>
        </CardTitle>
        <Form>
          <FormContainer>
            <FormGroup label="Enter your name" labelFor="name">
              <InputGroup
                id="name"
                leftIcon="user"
                // @ts-ignore
                onChange={e => setName(e.target.value)}
                value={name}
                disabled={isLoading}
              />
            </FormGroup>
            <FormGroup label="Enter your e-mail" labelFor="email">
              <InputGroup
                id="email"
                leftIcon="envelope"
                // @ts-ignore
                onChange={e => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
              />
            </FormGroup>
            <FormGroup label="Enter your password" labelFor="password">
              <InputGroup
                id="password"
                type="password"
                leftIcon="lock"
                value={password}
                // @ts-ignore
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </FormGroup>
          </FormContainer>
        </Form>
        <BottomContent>
          <Button
            icon="log-in"
            text="Register"
            onClick={handleRegister}
            loading={isLoading}
          />
        </BottomContent>
      </Card>
    </Container>
  );
};

export default Register;
