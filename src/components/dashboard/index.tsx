import React from 'react';
import {
  Card,
  Elevation,
  InputGroup,
  FormGroup,
  Button,
} from '@blueprintjs/core';
import {
  Container,
  CardTitle,
  Form,
  FormContainer,
  BottomContent,
} from './styles';
import { useAuth } from '../../hooks/Auth';

const Dashboard = (): React.ReactElement => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Card elevation={Elevation.FOUR}>
        <CardTitle>
          <h4>Dashboard</h4>
        </CardTitle>
        <Form>
          <FormContainer>
            <FormGroup label="Logged User e-mail" labelFor="email">
              <InputGroup
                id="email"
                leftIcon="envelope"
                // @ts-ignore
                value={user.email}
                disabled={!!user}
              />
            </FormGroup>
            <FormGroup label="Logged user name" labelFor="password">
              <InputGroup
                id="name"
                leftIcon="user"
                value={user.name}
                // @ts-ignore
                disabled={!!user}
              />
            </FormGroup>
          </FormContainer>
        </Form>
        <BottomContent>
          <Button text="Logout" onClick={signOut} />
        </BottomContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
