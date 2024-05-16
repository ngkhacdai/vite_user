import { Affix } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Chat from "../chat/Chat";

const Home = () => {
  return (
    <div>
      <Affix offsetTop={0}>
        <div className=" z-10 top-0 bg-green-200 w-full h-auto ">
          <Header />
        </div>
      </Affix>
      <Outlet />
      <Chat />
    </div>
  );
};

export default Home;
