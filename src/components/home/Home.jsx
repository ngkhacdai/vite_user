import { Affix } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Affix offsetTop={0}>
        <div className=" z-10 top-0 bg-green-200 w-full h-auto ">
          <Header />
        </div>
      </Affix>
      <Outlet />
      {/* <div className="bg-white">
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;
