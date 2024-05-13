import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useMediaQuery } from "react-responsive";
import NavBar from "./NavBar";

const Account = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 601px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {});
  return (
    <div className="h-full m-auto w-3/4">
      {isDesktopOrLaptop && <SideBar />}
      {isTabletOrMobile && <NavBar />}
    </div>
  );
};

export default Account;
