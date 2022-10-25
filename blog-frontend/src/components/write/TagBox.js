const TagBoxBlock = styled.div`
  margin: 50px auto;
  width: 100%;
  border: 2px solid #000;
  border-radius: 3px;
`;

const TagForm = styled.form`
  input {
    width: 30%;
    padding: 0.5rem 0;
    border: 1px solid black;
    border-radius: 10px;
    outline: none;
  }

  button {
    cursor: pointer;
    border-radius: 10px;
    width: 50px;
    height: 30px;
    color: white;
    background: rgb(0, 172, 238);
    background: linear-gradient(
      0deg,
      rgba(0, 172, 238, 1) 0%,
      rgba(2, 126, 251, 1) 100%
    );
    border: none;
    :hover {
      background: rgb(0, 3, 255);
      background: linear-gradient(
        0deg,
        rgba(0, 3, 255, 1) 0%,
        rgba(2, 126, 251, 1) 100%
      );
    }
  }
`;

const TagListBlock = styled.div``;

const Tag = styled.div`
  background-color: #f17f42;
  color: white;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 15px;
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
    align-items: center;
    margin-left: 0.5rem;
    font-size: 19px;

    :hover {
      box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
        rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
    }
  }
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag>
    <span className="text">{tag}</span>
    <span className="close" onClick={() => onRemove(tag)}>
      X
    </span>
  </Tag>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

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

<TagBoxBlock>
  <h4>원하는 태그를 넣어주세요</h4>
  <TagForm onSubmit={onSubmit}>
    <input placeholder="태그를 입력하세요" value={input} onChange={onChange} />
    <button type="submit">추가</button>
  </TagForm>
  <TagList tags={localTags} onRemove={onRemove} />
  <ButtonsBox>
    <button onClick={onSavePost}>포스트 등록</button>
    <button>취소</button>
  </ButtonsBox>
</TagBoxBlock>;
