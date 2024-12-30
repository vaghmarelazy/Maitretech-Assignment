
import Fork from "../assets/restaurant_24px.svg";
import { useEffect } from "react";

function HomePage() {
    useEffect(()=>{
        document.title = "Food's Restaurant";
      }, []);

  return (
    <div className="min-h-screen w-full">
      <header className="w-full bg-blue-600 text-white flex items-center h-16 p-4 text-xl gap-3">
        <span>
          <img src={Fork} alt="" className="w-8 text-white" />
          {/* <Fork/> */}
        </span>
        <h1 className="font-semibold">Food &apos; s Restaurant</h1>
      </header>
      <div className="w-full  text-center h-[40vh] flex items-center justify-center">
        <h1 className="w-[60%] text-8xl font-thin ">
          Welcome to Food&apos;s Kichen
        </h1>
      </div>
      <div className="text-center w-full">
        <button className=" bg-blue-600 font-semibold p-2 text-white rounded-md "><a href="/menu">Go to Menu</a></button>
      </div>
    </div>
  );
}

export default HomePage;
