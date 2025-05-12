import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/Header';
import { Navbar } from '@components/Navbar';

export const Main = () => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar opened={opened} toggle={toggle} />
      <AppShell.Main
        styles={{
          main: {
            paddingLeft:
              'calc(var(--app-shell-navbar-offset) + var(--mantine-spacing-md)',
            paddingTop:
              'calc(var(--app-shell-header-height) + var(--mantine-spacing-md))',
            paddingRight: 'var(--mantine-spacing-md)',
            paddingBottom: 'var(--mantine-spacing-md)',
          },
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
