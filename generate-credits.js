const fs = require("fs");

const config = JSON.parse(fs.readFileSync("credits.json", "utf8"));

const { credits, speed, fontSize } = config;

const textBlock = credits.join("\n");

const lineHeight = fontSize * 1.4;
const totalHeight = credits.length * lineHeight;

const svg = `
<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    text {
      font-family: sans-serif;
      white-space: pre;
      font-size: ${fontSize}px;
    }
  </style>

  <g>
    <text y="250">
${textBlock}
    </text>

    <animateTransform
      attributeName="transform"
      type="translate"
      from="0 0"
      to="0 -${totalHeight + 250}"
      dur="${speed}s"
      repeatCount="indefinite"
    />
  </g>
</svg>
`;

fs.writeFileSync("credits.svg", svg.trim());
console.log("credits.svg updated");
