import Editor from 'components/posts/PostWrite';
import NavbarContainer from 'containers/common/NavbarContainer';
import React from 'react';

const WritePage = () => {
  return (
    <>
      <NavbarContainer />
      <Editor />
    </>
  );
};

export default WritePage;
