function OSVG({ stroke = "#fff", strokeWidth = 1 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-${strokeWidth / 2} -${strokeWidth / 2} ${
        10 + strokeWidth * 2
      } ${10 + strokeWidth * 2}`}
    >
      <circle
        cx="5"
        cy="5"
        r="5"
        fill="transparent"
        stroke={stroke}
        stroke-width={strokeWidth}
      />
    </svg>
  );
}

export default OSVG;
