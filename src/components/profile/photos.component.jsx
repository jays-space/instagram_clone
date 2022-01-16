import propTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProfilePagePhotos = ({ photos, username }) =>
  !photos ? (
    <Skeleton width={250} height={250} count={6} />
  ) : photos?.length <=0 ? (<p>{username} has no photos</p>) : (
    photos?.map((photo) => (
      <img key={photo.docId} src={photo.imageSrc} alt={photo.caption} />
    ))
  );

export default ProfilePagePhotos;

ProfilePagePhotos.propTypes = {
  photos: propTypes.array.isRequired,
};
