import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePhotos from "../hooks/use-photos.hook";

//COMPONENTS
import Post from "./post";

const Timeline = () => {
  const { photos } = usePhotos();

  /**
   ** render photos: check of there is a result returned. I not, render skeleton, else check if there are photos returned (photos?.length). If not, display message for user to follow others, else display photos (Post)
   */
  return (
    <div className="col-span-3 md:col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-4" />
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post key={content.docId} content={content} />
        ))
      ) : (
        <p className="text-center text-2xl">Follow people to see photos.</p>
      )}
    </div>
  );
};

export default Timeline;
/**
 *   {[...new Array(4)].map((_, index) => (
            <Skeleton key={index} count={1} width={320} height={400} />
          ))}
 */
