import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import {
  ActionIcon,
  AppShell,
  Burger,
  Divider,
  Group,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Check, Plus, Search, X } from 'lucide-react';

import { useDB } from '@hooks/useDB';
import { ListItem } from '@components/ListItem';
import { TNoteData } from '@/types';

interface INavbarProps {
  opened: boolean;
  toggle: () => void;
}

export const Navbar: FC<INavbarProps> = ({ opened, toggle }) => {
  const [title, setTitle] = useState('');
  const [creating, { open, close }] = useDisclosure();
  const { data, isPending, addNote } = useDB();
  const [notes, setNotes] = useState<TNoteData[]>([]);
  const [query, setQuery] = useState<string>('');

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onConfirm = async (e: FormEvent) => {
    e.preventDefault();
    await addNote({ title });
    setTitle('');
    close();
  };

  const onCancel = () => {
    setTitle('');
    close();
  };

  useEffect(() => {
    const filtered = data.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setNotes(filtered);
  }, [isPending, query]);

  return (
    <AppShell.Navbar p="md">
      <Stack mb="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <TextInput
          leftSection={<Search size={16} />}
          placeholder="Search"
          onChange={onSearch}
          disabled={isPending}
          value={query}
        />
        <Group>
          <Text fw="bold">Notes list</Text>
          <ActionIcon
            variant="light"
            radius="md"
            onClick={open}
            disabled={isPending}
          >
            <Plus size={20} />
          </ActionIcon>
        </Group>
      </Stack>
      <Divider />
      <Stack gap="sm" mt="md">
        {creating && (
          <form onSubmit={onConfirm}>
            <Group>
              <TextInput
                placeholder="Note title"
                w="100%"
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => (e.key === 'Escape' ? onCancel() : null)}
                value={title}
                required
                autoFocus
              />
              <Group w="100%" grow>
                <ActionIcon
                  variant="light"
                  radius="md"
                  type="submit"
                  disabled={isPending || !title}
                >
                  <Check size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  color="red"
                  radius="md"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  <X size={20} />
                </ActionIcon>
              </Group>
            </Group>
          </form>
        )}
        {isPending &&
          new Array(8).fill(0).map((_, i) => <Skeleton key={i} h={32} />)}
        {notes.map((note, i) => (
          <ListItem key={i} note={note} onClick={toggle} />
        ))}
      </Stack>
    </AppShell.Navbar>
  );
};
