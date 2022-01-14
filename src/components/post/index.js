import { useRef } from "react";
import propTypes from "prop-types";

const Post = ({ content }) => {
  const { imageSrc } = content;
  return <p>{imageSrc}</p>;
};

export default Post;

Post.propTypes = {
  content: propTypes.object.isRequired,
};
