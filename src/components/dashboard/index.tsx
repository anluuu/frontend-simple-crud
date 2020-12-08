import React, { useCallback, useState } from 'react';
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
import { useToast } from '../../hooks/Toast';

const Dashboard = (): React.ReactElement => {
  const { signOut, user } = useAuth();
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const token = localStorage.getItem('@simpleCrud:token');
  const { addToast } = useToast();

  const editUser = useCallback(() => {
    setIsEditable(true);
    try {
      if (newName === user.name || newEmail === user.email)
        addToast({
          title: 'Attention',
          type: 'info',
          description: 'Some of your fields is identical',
        });
      setIsEditable(false);
      return;
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Something Wrong',
        description: 'An unexpected error happened',
      });
      setIsEditable(false);
    }
  }, []);
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
                onChange={e => setNewEmail(e.target.value)}
                value={user.email}
                disabled={!isEditable}
              />
            </FormGroup>
            <FormGroup label="Logged user name" labelFor="password">
              <InputGroup
                id="name"
                leftIcon="user"
                value={user.name}
                // @ts-ignore
                onChange={e => setNewName(e.target.value)}
                disabled={!isEditable}
              />
            </FormGroup>
          </FormContainer>
        </Form>
        <BottomContent>
          <Button text="Edit" icon="edit" onClick={editUser} />
          <Button text="Logout" icon="log-out" onClick={signOut} />
        </BottomContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
