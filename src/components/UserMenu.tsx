import { Menu, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LogOut, User } from 'lucide-react';

import { ModalLogout } from '@components/ModalLogout';
import { useAuth } from '@/context/AuthProvider';

export const UserMenu = () => {
  const [modal, { open, close }] = useDisclosure();
  const auth = useAuth();

  return (
    <Menu position="bottom-end" withArrow arrowPosition="center" offset={-4}>
      <ModalLogout opened={modal} close={close} />
      <Menu.Target>
        <Tooltip
          label={auth?.userData?.email}
          color="gray"
          transitionProps={{ transition: 'fade-down' }}
          zIndex={301}
        >
          <User cursor="pointer" size={48} style={{ padding: '0.6rem' }} />
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{auth?.userData?.email}</Menu.Label>
        <Menu.Item leftSection={<LogOut size={14} />} onClick={open}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
