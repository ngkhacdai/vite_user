import { Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { deleteAddress, getAddress } from "../../service/userAPI";
import ModalAddress from "./ModalAddress";
import { IoMdClose } from "react-icons/io";
const Address = () => {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsloading] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressID, setAddressID] = useState("");
  const showModal = (id) => {
    setAddressID(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    console.log(addressID);
    console.log(localStorage.getItem("token"));
    await deleteAddress(addressID);
    await getData();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getData = async () => {
    setAddress(await getAddress());
    setIsloading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xl">Địa chỉ của tôi</p>
        <ModalAddress getData={() => getData()} />
      </div>
      <br />
      <hr />
      <div>
        <p className="text-xl">Địa chỉ</p>
        <br />
      </div>
      <div>
        {address &&
          address.length > 0 &&
          address.map((item, index) => {
            return (
              <div key={`address-${index}`}>
                <div className="flex justify-between mt-2">
                  <div>
                    <div className="flex ">
                      <p className="mr-2">{item.userinfor.userName}</p>
                      <p>0{item.userinfor.phoneNumber}</p>
                    </div>
                    <p>{item.nameAddress}</p>
                    <p>{item.customAddress}</p>
                  </div>
                  <div>
                    <IoMdClose
                      onClick={() => {
                        showModal(item._id);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <br />
                <hr />
              </div>
            );
          })}
      </div>
      <Modal
        title="Xóa địa chỉ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn xóa địa chỉ này không?</p>
      </Modal>
    </div>
  );
};

export default Address;
