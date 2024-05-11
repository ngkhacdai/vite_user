import { useEffect, useState } from "react";
import Address from "./Address";
import { getAddress } from "../../service/userAPI";
import { Spin } from "antd";
import TableProduct from "./TableProduct";
import Method from "./Method";

const CheckOut = () => {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setAddress(await getAddress());
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="m-auto w-3/4 mt-2">
      <Address address={address} />
      <TableProduct />
      <Method address={address} />
    </div>
  );
};

export default CheckOut;
