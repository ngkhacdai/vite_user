import { API } from "../../service/customAxios";
import Meta from "antd/es/card/Meta";
import { Card, Col, Row } from "antd";

const ListCategory = ({ category }) => {
  return (
    <div className="bg-white p-2 mb-3">
      <Row className="m-auto" gutter={[20, 20]}>
        {category.map((item, index) => {
          return (
            <div key={`category-${index}`}>
              <Col span={6}>
                <Card
                  hoverable
                  style={{ width: 200 }}
                  cover={<img alt="" src={`${API}/${item.category_thumb}`} />}
                >
                  <Meta title={item.category_name} />
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
    </div>
  );
};

export default ListCategory;
