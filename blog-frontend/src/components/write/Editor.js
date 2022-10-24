import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const EditorBlock = styled.div`
  padding-top: 10px;
  padding-bottom: 100px;
`;

const TitleInput = styled.input``;

const QuillWrapper = styled.div``;

const Editor = () => {
  const modules = {
    tollbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      [{ align: [] }, { color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <div style={{ height: '605px' }}>
      <Quill
        style={{ height: '600px' }}
        theme="snow"
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
