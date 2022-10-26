import PostViewer from 'components/posts/PostViewer';
import NavbarContainer from 'containers/common/NavbarContainer';
import React from 'react';

function PostPage() {
  return (
    <>
      <NavbarContainer />
      <PostViewer />
    </>
  );
}

export default PostPage;
