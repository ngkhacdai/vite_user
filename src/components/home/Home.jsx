import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-green-200 w-full ">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
