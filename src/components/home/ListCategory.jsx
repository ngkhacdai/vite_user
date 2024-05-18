import { useNavigate } from "react-router-dom";
import { API } from "../../service/customAxios";
import "./home.css";
import { Col, Row } from "antd";

const ListCategory = ({ category }) => {
  const navigate = useNavigate();

  const onSelectCategory = (select) => {
    const params = new URLSearchParams({
      id: select._id,
      name: select.category_name,
    }).toString();
    navigate(`/category?${params}`);
  };
  return (
    <div className="bg-white p-2 mb-3">
      <div className="relative">
        <Row gutter={[10, 10]} justify="start">
          {category.map((item, index) => {
            return (
              <Col
                onClick={() => onSelectCategory(item)}
                className="text-center justify-center flex-col flex cursor-pointer border hover:drop-shadow-lg border-transparent  hover:border-black"
                xs={6}
                sm={4}
                md={4}
                lg={3}
                xl={2}
                key={`category-${index}`}
              >
                <img
                  className=""
                  src={`${API}/${item.category_thumb}`}
                  alt=""
                />
                <p>{item.category_name}</p>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default ListCategory;
