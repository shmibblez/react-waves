function SolidCircleSVG({ stroke = "#ffffff" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 -0.5 11 11">
      <circle
        cx="5"
        cy="5"
        r="5"
        fill={stroke}
        stroke={stroke}
        stroke-width="1"
      />
    </svg>
  );
}

export default SolidCircleSVG;
