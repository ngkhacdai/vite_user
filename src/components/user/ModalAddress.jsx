import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { addAddress } from "../../service/userAPI";

const ModalAddress = ({ getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [nameAddress, setNameAddress] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    const cityName =
      cities.find((city) => city.Id === selectedCity)?.Name || "";
    const districtName =
      districts.find((district) => district.Id === selectedDistrict)?.Name ||
      "";
    const wardName = wards.find((ward) => ward.Id === selectedWard)?.Name || "";
    if (!nameAddress || !address || !cityName || !districtName || !wardName) {
      toast.error("Hãy điền đầy đủ các trường");
    } else {
      const form = {
        nameAddress: nameAddress,
        address: address + " " + wardName + " " + districtName + " " + cityName,
      };
      await addAddress(form);
      getData();
      setIsModalOpen(false);
      onClearForm();
    }
  };
  const onClearForm = () => {
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    setNameAddress("");
    setAddress("");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    onClearForm();
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedDistrict("");
    setDistricts(cities.find((city) => city.Id === value)?.Districts || []);
    setWards([]); // Reset danh sách phường/xã khi chọn lại thành phố
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setWards(
      cities
        .find((city) => city.Id === selectedCity)
        ?.Districts.find((district) => district.Id === value)?.Wards || []
    );
  };

  const handleWardChange = (value) => {
    setSelectedWard(value);
  };

  return (
    <div>
      <Button
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
        onClick={showModal}
      >
        <PlusOutlined /> Thêm địa chỉ mới
      </Button>
      <Modal
        title="Địa chỉ mới"
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
        >
          <Form.Item name="addressName" label="Tên địa chỉ">
            <Input
              value={nameAddress}
              onChange={(e) => setNameAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="selectAddress" label="Địa chỉ">
            <Select
              className="form-select form-select-sm mb-3"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <Select.Option value="" disabled>
                Chọn tỉnh thành
              </Select.Option>
              {cities.map((city) => (
                <Select.Option key={city.Id} value={city.Id}>
                  {city.Name}
                </Select.Option>
              ))}
            </Select>

            <Select
              className="form-select form-select-sm mb-3"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <Select.Option value="" disabled>
                Chọn quận huyện
              </Select.Option>
              {districts.map((district) => (
                <Select.Option key={district.Id} value={district.Id}>
                  {district.Name}
                </Select.Option>
              ))}
            </Select>

            <Select
              className="form-select form-select-sm"
              value={selectedWard}
              onChange={handleWardChange}
            >
              <Select.Option value="" disabled>
                Chọn phường xã
              </Select.Option>
              {wards.map((ward) => (
                <Select.Option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="address" label={"Địa chỉ cụ thể"}>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default ModalAddress;
