import { useEffect, useState } from "react";
import SideBar from "./SideBar";

const Account = () => {
  const [checkWidth, setCheckWidth] = useState(false);
  useEffect(() => {});
  return (
    <div className="h-full m-auto ">
      <SideBar />
    </div>
  );
};

export default Account;
