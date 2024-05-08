import { useEffect, useState } from "react";
import { deleteProductInCart, getCart } from "../../service/cartAPI";
import { Table } from "antd";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(cart);
  const getData = async () => {
    setCart(await getCart());
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Phân loại",
      //   dataIndex: "color",
      render: (record) => {
        return (
          <div>
            <div>{record.color}</div>
            <div>{record.size}</div>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Số tiền",
      render: (record) => {
        return <p>{record.price * record.quantity}đ</p>;
      },
    },
    {
      title: "Thao tác",
      render: (record) => {
        return (
          <div>
            <button
              onClick={() => onDeleteProduct(record)}
              className="hover:text-red-500"
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];
  const onDeleteProduct = async (record) => {
    const form = {
      productId: record.productId,
      size: record.size,
      color: record.color,
    };
    await deleteProductInCart(form);
    setIsLoading(true);
    await getData();
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div className="w-3/4 m-auto bg-white">
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={cart.cart_products}
      />
    </div>
  );
};

export default Cart;
