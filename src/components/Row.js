import axios from "axios";
import {useState, useEffect, useRef} from "react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import Movie from "./Movie";
function Row({title, fetchURL}) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slider = useRef();
  const slideLeft = () => {
    slider.current.scrollLeft = slider.current.scrollLeft - 500;
  };

  const slideRight = () => {
    slider.current.scrollLeft = slider.current.scrollLeft + 500;
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
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
            <Movie item={item} key={index} />
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

export default Row;
