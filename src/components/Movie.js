import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
function Movie({item}) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const {user} = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(!saved);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please login to save a movie");
    }
  };

  return (
    <div className="inline-block relative p-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] cursor-pointer  ">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:opacity-100 opacity-0 text-white  ">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex items-center justify-center h-full text-center ">
          {item?.title}
        </p>
        <p onClick={saveShow}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-400" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-400" />
          )}
        </p>
      </div>
    </div>
  );
}

export default Movie;
