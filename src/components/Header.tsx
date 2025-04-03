import { FC } from 'react';
import { AppShell, Burger, Group } from '@mantine/core';

import { UserMenu } from '@components/UserMenu';

interface IHeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const Header: FC<IHeaderProps> = ({ opened, toggle }) => {
  return (
    <AppShell.Header>
      <Group h="100%" justify="flex-end" px="md" grow>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Group justify="flex-end">
          <UserMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
