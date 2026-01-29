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

export default Button;

