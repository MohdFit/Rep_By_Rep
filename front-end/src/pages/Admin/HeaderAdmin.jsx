import { memo } from "react";
import userIcon from "../../assets/images/allproducts/User.png";
import shoppingCartIcon from "../../assets/images/allproducts/ShoppingCart.png";

function Header({
  className = "mt-[40px] sm:mt-[32px] px-[17px] sm:px-[60px] relative min-h-[36px]",
}) {
  return (
    <div className={className}>
      <header className="w-full fixed top-0 left-0 w-full flex items-center justify-between bg-white px-[60px] py-[16px] z-50">
        
        <div className="flex items-center justify-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-[40px] w-auto sm:h-[40px]"
          />
        </div>

        
        <div className="flex items-center space-x-4">
          <button type="button" aria-label="Cart">
            <img
              src={shoppingCartIcon}
              alt="shopping cart"
              className="w-[24px] h-[24px]"
            />
          </button>

          <button type="button" aria-label="Account">
            <img
              src={userIcon}
              alt="user account"
              className="w-[24px] h-[24px]"
            />
          </button>
        </div>
      </header>

    </div>
  );
}

export default memo(Header);

