import { useContext, useState } from "react";
import propTypes from "prop-types";

// CONTEXT
import UserContext from "../../context/user.context";

//SERVICES
import { submitComment } from "../../services/firebase.services";

const AddComment = ({ docId, comments, setComments, commentInput }) => {
  const [comment, setComment] = useState("");
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setComments([{ displayName, comment }, ...comments]);
    setComment("");

    await submitComment(docId, displayName, comment);
    return null;
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddComment;

AddComment.propTypes = {
  docId: propTypes.string.isRequired,
  comments: propTypes.array.isRequired,
  setComments: propTypes.func.isRequired,
  commentInput: propTypes.object,
};
