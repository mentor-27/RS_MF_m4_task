import { FC } from 'react';
import { Button, Group, Modal } from '@mantine/core';

interface IModalDeleteProps {
  opened: boolean;
  close: () => void;
  onDelete: () => void;
}

export const ModalDelete: FC<IModalDeleteProps> = ({
  opened,
  close,
  onDelete,
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Delete note?">
      <Group grow>
        <Button onClick={close}>Cancel</Button>
        <Button color="orange" onClick={onDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
