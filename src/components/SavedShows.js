import {useRef, useState, useEffect} from "react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import {UserAuth} from "../context/AuthContext";
import {db} from "../firebase";
import {updateDoc, doc, onSnapshot} from "firebase/firestore";
import {AiOutlineClose} from "react-icons/ai";

function SavedShows() {
  const [movies, setMovies] = useState([]);
  const {user} = UserAuth();
  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };
  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white rounded-full absolute left-0 z-10 cursor-pointer hidden group-hover:block opacity-50 hover:opacity-100"
          size={40}
        />
        <div
          ref={slider}
          className="w-full h-full relative overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide  "
        >
          {movies.map((item, index) => (
            <div
              key={index}
              className="inline-block relative p-2 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] cursor-pointer  "
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/original/${item?.img}`}
                alt={item?.title}
              />
              <div className=" absolute top-0 left-0 w-full h-full hover:bg-black/80 hover:opacity-100 opacity-0 text-white  ">
                <p className="whitespace-normal text-xs md:text-sm font-bold flex items-center justify-center h-full text-center ">
                  {item?.title}
                </p>
                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-4 right-4"
                >
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white rounded-full absolute right-0 z-10 cursor-pointer hidden group-hover:block opacity-50 hover:opacity-100"
          size={40}
        />
      </div>
    </div>
  );
}

export default SavedShows;
