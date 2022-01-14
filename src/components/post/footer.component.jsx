import propTypes from "prop-types";

const PostFooter = ({ caption, username }) => {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="mr-1 font-bold">{username}</span>
      <span className="italic">{caption}</span>
    </div>
  );
};

export default PostFooter;

PostFooter.propTypes = {
  caption: propTypes.string.isRequired,
  username: propTypes.string.isRequired,
};
