import { FC, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { ActionIcon, Flex, Group, TextInput } from '@mantine/core';
import { Save, X } from 'lucide-react';

import { TNoteData } from '@types';
import { useDB } from '@hooks/useDB';

type TREProps = {
  note: TNoteData;
  setEdit: (value: boolean) => void;
};

export const RichEditor: FC<TREProps> = ({ note, setEdit }) => {
  const [noteData, setNoteData] = useState({
    title: note?.title,
    content: note?.content,
  });
  const { editNote } = useDB();

  const onSave = async () => {
    await editNote(note.id!, noteData);
    setEdit(false);
  };

  const onCancel = () => {
    setNoteData({ title: note?.title, content: note?.content });
    setEdit(false);
  };

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content: note?.content,
      onUpdate: ({ editor }) => {
        setNoteData({ ...noteData, content: editor.getHTML() });
      },
      autofocus: true,
    },
    [note.content]
  );

  return (
    <>
      <TextInput
        value={noteData.title}
        onChange={e => setNoteData({ ...noteData, title: e.target.value })}
        label="Note title"
        pb="md"
      />
      <RichTextEditor
        h={
          'calc(100vh - var(--app-shell-header-height) - var(--mantine-spacing-md) * 2)'
        }
        editor={editor}
        flex={1}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <Group justify="space-between" w={'100%'}>
            <Group gap={12}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </Group>

            <ActionIcon.Group>
              <ActionIcon variant="light" onClick={onSave}>
                <Save size={16} />
              </ActionIcon>
              <ActionIcon variant="light" color="red" onClick={onCancel}>
                <X size={16} />
              </ActionIcon>
            </ActionIcon.Group>
          </Group>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </>
  );
};
