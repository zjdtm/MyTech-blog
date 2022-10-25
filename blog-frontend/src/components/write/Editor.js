import { createPost } from 'features/posts/postsSlice';
import React, { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const TitleInput = styled.input`
  width: 100%;
  border: 5px solid #00b4cc;
  padding: 20px;
  height: 20px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
`;

// const Quill = styled(ReactQuill)`
//   width: 100%;
//   height: 500px;
// `;

const TagBox = styled.div`
  margin: 50px auto;
  border: 2px solid #000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;
  width: min(80vw, 600px);
`;

const TagItem = styled.div`
  background-color: #f17f42;
  color: white;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 10px;

  .close {
    cursor: pointer;
    height: 20px;
    width: 20px;

    background-color: rgb(48, 48, 48);
    display: inline-block;
    color: #fff;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: flex-end;
    margin-left: 0.5rem;
    font-size: 19px;

    :hover {
      box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
        rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    }
  }
`;

const TagInpupt = styled.input`
  flex-grow: 1;
  padding: 0.5rem 0;
  border: none;
  outline: none;
`;

const ButtonsBox = styled.div`
  text-align: center;

  button {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    cursor: pointer;
    border: 3px solid;
    padding: 0.25em 0.5em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px,
      4px 4px 0px 0px, 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    :active {
      box-shadow: 0px 0px 0px 0px;
      top: 5px;
      left: 5px;
    }
  }
`;

const Editor = () => {
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ['bold', 'italic', 'underline', 'Strike', 'blockquote'],
  //     [
  //       { list: 'ordered' },
  //       { list: 'bullet' },
  //       { indent: '-1' },
  //       { indent: '+1' },
  //     ],
  //     ['link', 'image'],
  //     [{ align: [] }, { color: [] }, { background: [] }],
  //     ['clean'],
  //   ],
  // };

  // const formats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  //   'align',
  //   'color',
  //   'background',
  // ];

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onTagChanged = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  };
  const onTagRemove = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const onSavePost = () => {
    if (title && body && tags) {
      const postData = {
        title,
        body,
        tags,
      };
      dispatch(createPost(postData));
      setTitle('');
      setBody('');
      setTags([]);
    }
  };

  const check = Boolean(title) && Boolean(body) && Boolean(user);

  return (
    <>
      <TitleInput
        type="text"
        id="title"
        name="title"
        value={title}
        placeholder="제목을 입력하세요"
        onChange={onTitleChanged}
      />
      {/* <Quill
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder="본문 내용을 입력하세요"
        onChange={(content, delta, source, editor) =>
          onBodyChanged(editor.getHTML())
        }
      /> */}
      <textarea
        id="body"
        name="body"
        value={body}
        placeholder="본문을 입력하세요"
        onChange={onBodyChanged}
      />
      <TagBox>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            <span className="text">{tag}</span>
            <span className="close" onClick={() => onTagRemove(index)}>
              &times;
            </span>
          </TagItem>
        ))}
        <TagInpupt
          onKeyDown={onTagChanged}
          type="text"
          placeholder="태그를 입력해주세요"
        />
      </TagBox>
      <ButtonsBox>
        <button onClick={onSavePost}>포스트 등록</button>
        <button>취소</button>
      </ButtonsBox>
    </>
  );
};

export default Editor;
