import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLink as MantineNavLink } from '@mantine/core';

import { internalRoutes } from '@/internalRoutes';
import { TNoteData } from '@types';

type INavbarProps = {
  onClick: () => void;
  note: TNoteData;
};

export const ListItem: FC<INavbarProps> = ({ onClick, note }) => {
  return (
    <MantineNavLink
      to={internalRoutes.note(note.id!)}
      onClick={onClick}
      component={NavLink}
      h={32}
      label={note.title}
      variant="subtle"
    />
  );
};
