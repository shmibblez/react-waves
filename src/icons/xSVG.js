function XSVG({ stroke = "#fff", strokeWidth = 1 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-${strokeWidth / 2} -${strokeWidth / 2} ${
        10 + strokeWidth * 2
      } ${10 + strokeWidth * 2}`}
    >
      <path
        d="M0 0 L10 10 M0 10 L10 0"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default XSVG;
