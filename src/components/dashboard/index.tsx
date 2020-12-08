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
  const { signOut, user, updateUser, deleteUser } = useAuth();
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [isEditable, setIsEditable] = useState(false);

  const { addToast } = useToast();

  const editUser = useCallback(() => {
    setIsEditable(true);
  }, []);

  const handleEdit = useCallback(async () => {
    try {
      await updateUser({
        name: newName,
        email: newEmail,
        id: user.id,
      });

      addToast({
        type: 'success',
        title: 'Success',
        description: 'Updated with success',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Something Wrong',
        description: 'An unexpected error happened',
      });
      setIsEditable(false);
    }
  }, [addToast, newEmail, newName, updateUser, user.id]);

  const handleDelete = useCallback(async () => {
    await deleteUser(user.id);
    addToast({
      type: 'success',
      title: 'Deleted user',
      description: 'The user has been deleted',
    });
    await signOut();
  }, [addToast, deleteUser, signOut]);
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
                value={newEmail}
                disabled={!isEditable}
              />
            </FormGroup>
            <FormGroup label="Logged user name" labelFor="password">
              <InputGroup
                id="name"
                leftIcon="user"
                value={newName}
                // @ts-ignore
                onChange={e => setNewName(e.target.value)}
                disabled={!isEditable}
              />
            </FormGroup>
          </FormContainer>
        </Form>
        <BottomContent>
          <Button text="Delete" icon="delete" onClick={handleDelete} />
          {!isEditable ? (
            <Button text="Edit" icon="edit" onClick={editUser} />
          ) : (
            <Button text="Save" icon="saved" onClick={handleEdit} />
          )}
          <Button text="Logout" icon="log-out" onClick={signOut} />
        </BottomContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
