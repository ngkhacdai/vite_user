import { Button, Table } from "antd";
import { deleteProductInCart, getCart } from "../../service/cartAPI";
import { useDispatch } from "react-redux";
import { onSelectProduct } from "../../redux/slice/cartSlice";
import { updateUserCartQuantity } from "../../service/cartAPI";
import { API } from "../../service/customAxios";
const TableProduct = ({ cart, getData, setIsLoading }) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Sản phẩm",
      render: (record) => {
        return (
          <div className="flex justify-start overflow-hidden">
            <img
              src={`${API}/uploads/${record.product_thumb}`}
              style={{ width: "50px", height: "50px" }}
            />
            <span className="w-56 line-clamp-2 pl-2">{record.name}</span>
          </div>
        );
      },
    },
    {
      title: "Phân loại",
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
      render: (record) => {
        return (
          <p>
            {record.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Số lượng",
      render: (record) => {
        return (
          <div>
            <Button onClick={() => onDecrement(record)}>-</Button>
            <span className="mx-2">{record.quantity}</span>
            <Button onClick={() => onIncrement(record)}>+</Button>
          </div>
        );
      },
    },
    {
      title: "Số tiền",
      render: (record) => {
        let total = record.price * record.quantity;
        return (
          <p>
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Thao tác",
      render: (record) => {
        return (
          <div>
            <Button
              onClick={() => onDeleteProduct(record)}
              className="hover:text-red-500"
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  const onDecrement = async (record) => {
    const userId = localStorage.getItem("userID");
    const shop_order_ids = [
      {
        shopId: record.shopId,
        item_product: [
          {
            productId: record.productId,
            quantity: record.quantity - 1,
            old_quantity: record.quantity,
            size: record.size,
            color: record.color,
          },
        ],
      },
    ];

    const formData = {
      userId,
      shop_order_ids,
    };
    await updateUserCartQuantity(formData);
    setIsLoading(true);
    await getData();
  };
  const onIncrement = async (record) => {
    const userId = localStorage.getItem("userID");
    const shop_order_ids = [
      {
        shopId: record.shopId,
        item_product: [
          {
            productId: record.productId,
            quantity: record.quantity + 1,
            old_quantity: record.quantity,
            size: record.size,
            color: record.color,
          },
        ],
      },
    ];

    const formData = {
      userId,
      shop_order_ids,
    };
    await updateUserCartQuantity(formData);
    setIsLoading(true);
    await getData();
  };
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
      dispatch(onSelectProduct(selectedRows));
    },
  };

  return (
    <div>
      <Table
        span={24}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        rowKey={"itemId"}
        dataSource={cart.cart_products}
        pagination={false}
        className="w-full"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TableProduct;
