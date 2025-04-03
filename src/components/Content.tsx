import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionIcon, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PenBox, Trash2 } from 'lucide-react';
import parse from 'html-react-parser';

import { useDB } from '@hooks/useDB';
import { RichEditor } from '@components/RichEditor';
import { ModalDelete } from '@components/ModalDelete';
import { internalRoutes } from '@/internalRoutes';

export const Content = () => {
  const [edit, setEdit] = useState(false);
  const [modal, { open, close }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { data, deleteNote } = useDB();

  const noteId = location.pathname.split('/')[2];
  const note = data.find(note => note.id === noteId);

  if (edit && note) return <RichEditor note={note} setEdit={setEdit} />;

  return (
    <>
      <ModalDelete
        opened={modal}
        close={close}
        onDelete={() => {
          deleteNote(noteId);
          navigate(internalRoutes.home);
        }}
      />
      <Paper
        px="md"
        withBorder
        h={
          'calc(100vh - var(--app-shell-header-height) - var(--mantine-spacing-md) * 2)'
        }
        pos="relative"
      >
        <Paper pos="absolute" top={8} right={8}>
          <ActionIcon.Group>
            <ActionIcon variant="light" onClick={() => setEdit(true)}>
              <PenBox size={16} />
            </ActionIcon>
            <ActionIcon variant="light" color="red" onClick={open}>
              <Trash2 size={16} />
            </ActionIcon>
          </ActionIcon.Group>
        </Paper>
        {parse(note?.content || '')}
      </Paper>
    </>
  );
};
