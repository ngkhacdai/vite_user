import ListProduct from "../ListProduct";

const ListProductShop = ({ shopData }) => {
  return (
    <div>
      <div>
        <ListProduct product={shopData.products} />
      </div>
    </div>
  );
};

export default ListProductShop;
