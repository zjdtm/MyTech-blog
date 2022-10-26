import Editor from 'components/posts/PostWrite';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postAdd } from 'features/posts/postsSlice';

const EditorContainer = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);

  const onSavePost = () => {
    if (title && body) {
      dispatch(
        postAdd({
          id: nanoid(),
          title,
          body,
        }),
      );
      setTitle('');
      setBody('');
    }
  };

  return (
    <Editor
      onTitleChanged={onTitleChanged}
      onBodyChanged={onBodyChanged}
      onSavePost={onSavePost}
    />
  );
};

export default EditorContainer;
