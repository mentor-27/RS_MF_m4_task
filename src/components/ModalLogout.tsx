import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Group, Modal } from '@mantine/core';

import { useAuth } from '@context/AuthProvider';

interface IModalLogoutProps {
  opened: boolean;
  close: () => void;
}

export const ModalLogout: FC<IModalLogoutProps> = ({ opened, close }) => {
  const navigate = useNavigate();
  const auth = useAuth();

  const onLogout = () => {
    auth?.signout(() => navigate('/login', { replace: true }));
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Leaving already?"
      overlayProps={{ backgroundOpacity: 0.5, blur: 3 }}
    >
      <Group grow>
        <Button onClick={onLogout}>Yes, I should go</Button>
        <Button color="orange" onClick={close}>
          No, nevermind
        </Button>
      </Group>
    </Modal>
  );
};
