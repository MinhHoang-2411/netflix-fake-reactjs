import SavedShows from "../components/SavedShows";

const Account = () => {
  return (
    <>
      <div className="w-full text-white">
        <img
          className="  w-full h-[400px] object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/1ef84595-1fdb-4404-adac-15215ceeb3ae/38067f6b-ec2e-43a3-816d-44bf2aeddd21/VN-en-20220711-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="/"
        />
        <div className="fixed bg-black/60 top-0 left-0 w-full h-[550px] "></div>
        <div className="absolute top-[20%] p-4 md:p-8 ">
          <h1 className="text-3xl md:text-5xl font-bold ">My Shows</h1>
        </div>
      </div>
      <SavedShows />
    </>
  );
};

export default Account;
