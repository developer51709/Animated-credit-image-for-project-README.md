const fs = require("fs");

const config = JSON.parse(fs.readFileSync("credits.json", "utf8"));

const {
  credits,
  speed,
  fontSize,
  textColor,
  backgroundColor,
  backgroundAnimation,
  particleAnimation
} = config;

const lineHeight = fontSize * 1.4;
const totalHeight = credits.length * lineHeight;

// Build <tspan> lines
const lines = credits
  .map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`)
  .join("\n");

// Optional animated background gradient
const animatedBackground = backgroundAnimation
  ? `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${backgroundColor}">
          <animate attributeName="stop-color"
            values="${backgroundColor};#222222;${backgroundColor}"
            dur="10s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#111111">
          <animate attributeName="stop-color"
            values="#111111;${backgroundColor};#111111"
            dur="10s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)" />
  `
  : `<rect width="100%" height="100%" fill="${backgroundColor}" />`;

// Optional particle animation
const particles = particleAnimation
  ? Array.from({ length: 12 })
      .map((_, i) => {
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 600;
        const duration = Math.random() * 8 + 6;

        return `
          <circle cx="${startX}" cy="220" r="${size}" fill="${textColor}" opacity="0.3">
            <animate attributeName="cy"
              from="220" to="-20"
              dur="${duration}s"
              repeatCount="indefinite" />
            <animate attributeName="cx"
              from="${startX}" to="${startX + (Math.random() * 40 - 20)}"
              dur="${duration}s"
              repeatCount="indefinite" />
          </circle>
        `;
      })
      .join("\n")
  : "";

// Final SVG
const svg = `
<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">

  ${animatedBackground}

  ${particles}

  <style>
    text {
      font-family: sans-serif;
      font-size: ${fontSize}px;
      fill: ${textColor};
    }
  </style>

  <g>
    <text y="250">
${lines}
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
