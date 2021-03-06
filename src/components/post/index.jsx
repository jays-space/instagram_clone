import { useRef } from "react";
import propTypes from "prop-types";

//COMPONENTS
import Header from "./header.component";
import Image from "./image.component";
import Actions from "./actions.component";
import Footer from "./footer.component";
import Comments from "./comments.components";

const Post = ({ content }) => {
  const {
    imageSrc,
    username,
    caption,
    docId,
    userLikedPhoto,
    likes,
    comments,
    dateCreated,
  } = content;
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-16">
      <Header username={username} />
      <Image src={imageSrc} caption={caption} />
      <Actions
        docId={docId}
        totalLikes={likes?.length}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;

Post.propTypes = {
  content: propTypes.shape({
    username: propTypes.string.isRequired,
    imageSrc: propTypes.string.isRequired,
    caption: propTypes.string.isRequired,
    docId: propTypes.string.isRequired,
    userLikedPhoto: propTypes.bool.isRequired,
    likes: propTypes.array.isRequired,
    comments: propTypes.array.isRequired,
    dateCreated: propTypes.number.isRequired,
  }),
};
