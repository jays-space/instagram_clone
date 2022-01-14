import propTypes from "prop-types";
import React from "react";

const PostImage = ({ src, caption }) => {
  return <img src={src} alt={caption} />;
};

PostImage.propTypes = {
  src: propTypes.string.isRequired,
  caption: propTypes.string.isRequired,
};

export default PostImage;
