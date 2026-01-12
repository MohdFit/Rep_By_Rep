import { memo } from "react";
import arrow from "../../assets/images/allproducts/Arrow.png";

function Product({ product }) {
  return (
    <div className="relative flex-none sm:basis-[calc((100%_-_60px)/4)] basis-[calc((100%_-_22px)/2)] translate-x-[var(--tx)] transition-transform duration-300">
      <img src={product.img} className="w-full" alt={product.type} />
      <div className="absolute bottom-3 text-white flex justify-between items-center w-full px-4">
        <div>
          <h3 className="font-semibold sm:text-2xl text-base">T-Shirt</h3>
          <h4 className="mb-2 text-[10px] font-medium sm:text-sm">20 $</h4>
        </div>
        <a className="bg-transparent">
          <img src={arrow} alt="" />
        </a>
      </div>
    </div>
  );
}

export default memo(Product);

