import { useState } from "react";
import propTypes from "prop-types";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";
import AddComment from "./add-comment.component";

const PostComments = ({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) => {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.slice(0, commentsSlice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}

        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            data-testid={`show-next-comment-btn-${docId}`}
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}

        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>

      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default PostComments;

PostComments.propTypes = {
  docId: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  posted: propTypes.number.isRequired,
  commentInput: propTypes.object.isRequired,
};
