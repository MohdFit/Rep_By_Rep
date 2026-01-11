function Button({ width, height, radius = 16, children }) {
  return (
    <button
      class="w-[300px] h-[80px]
         [border:double_1em_transparent] rounded-[16px]
         [background-image:linear-gradient(white,white),linear-gradient(to_right,green,gold)]
         [background-origin:border-box]
         [background-clip:content-box,_border-box]"
    >
      Shop Now
    </button>
  );
}

/*

<div className="p-[2px] rounded-[16px] bg-gradient-to-r from-orange-600 to-orange-500 my-4 relative">
            <input
              type="text"
              placeholder="Search For..."
              className="w-[368px] h-[32px] rounded-[14px] pl-2 bg-white placeholder-gray-400 text-black outline-none"
            />
            <img
              src={searchIcon}
              alt="glass"
              className="absolute right-[9px] bottom-[9px]"
            />
          </div>
*/
export default Button;
