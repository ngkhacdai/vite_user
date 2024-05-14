import { Button, Col, Modal, Radio, Row, Space } from "antd";
import { useState } from "react";
import { onSelectIndex } from "../../redux/slice/addressSlice";
import { useDispatch, useSelector } from "react-redux";

const Address = ({ address }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectIndex = useSelector((state) => state.address.selectIndex);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleRadioChange = (e) => {
    dispatch(onSelectIndex(parseInt(e.target.value)));
  };

  return (
    <div className="bg-white p-2">
      <div className="text-xl text-red-400">Địa chỉ nhận hàng</div>
      <Modal
        title="Địa chỉ của tôi"
        visible={isModalOpen} // visible thay cho open
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <hr />
        <Radio.Group onChange={handleRadioChange} value={selectIndex}>
          <Space direction="vertical">
            {address.map((item, index) => {
              return (
                <Radio key={`address-${index}`} value={index}>
                  <Row className="">
                    <Col className="mr-2 font-bold">
                      {item.userinfor.userName}
                    </Col>
                    <Col className="mr-2 font-bold">
                      0{item.userinfor.phoneNumber}
                    </Col>
                    <Col className="mr-2">{item.customAddress}</Col>
                  </Row>
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </Modal>
      {address && address.length > 0 ? (
        <Row className="items-center">
          <Col className="mr-2 font-bold">
            {address[selectIndex].userinfor.userName}
          </Col>
          <Col className="mr-2 font-bold">
            0{address[selectIndex].userinfor.phoneNumber}
          </Col>
          <Col className="mr-2">{address[selectIndex].customAddress}</Col>
          <Col className="mr-2">
            <Button className="border-none" onClick={showModal}>
              Thay đổi
            </Button>
          </Col>
        </Row>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Address;
