import box from "../../assets/images/allproducts/box.png";
import sec from "../../assets/images/allproducts/first.png";
import thr from "../../assets/images/allproducts/second.png";
import four from "../../assets/images/allproducts/fifth.png";
import five from "../../assets/images/allproducts/fourth.png";
import six from "../../assets/images/allproducts/sixth.png";
import sev from "../../assets/images/allproducts/seventh.png";
import lt from "../../assets/images/allproducts/lt.png";
import gt from "../../assets/images/allproducts/right.png";

import { useState, memo } from "react";
import Product from "./Product";
const products = [
  {
    type: "T-Shirt",
    price: 20,
    img: box,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: sec,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: thr,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: four,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: five,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: six,
  },
  {
    type: "T-Shirt",
    price: 20,
    img: sev,
  },
];
function Products() {
  const [slider, setSlider] = useState(0);

  return (
    // Set CSS variable here; cards inherit it and use translate-x-[var(--tx)]
    <div
      className="flex gap-[11px] sm:gap-5 relative overflow-hidden"
      style={{ "--tx": `${-slider * 100}%` }}
    >
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}

      <button
        disabled={slider === 0}
        className="absolute -translate-y-[50%] top-[50%] left-[10px] w-[30px] h-[30px] sm:w-[60px] sm:h-[60px]"
        onClick={() => setSlider((pre) => (pre > 0 ? pre - 1 : 0))}
      >
        <img src={lt} alt="less" />
      </button>

      <button
        className="absolute -translate-y-[50%] top-[50%] right-[10px] w-[30px] h-[30px] sm:w-[60px] sm:h-[60px]"
        onClick={() => setSlider((pre) => (pre === 2 ? 0 : pre + 1))}
      >
        <img src={gt} alt="more" />
      </button>
    </div>
  );
}

export default memo(Products);
