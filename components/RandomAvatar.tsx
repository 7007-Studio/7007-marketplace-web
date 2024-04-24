import React, { useRef, useEffect } from "react";

const RandomGitHubStyleAvatar = ({ width = 100, height = 100 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext("2d");

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 生成随机像素头像
    for (let x = 0; x < width; x += 10) {
      for (let y = 0; y < height; y += 10) {
        // 随机生成颜色
        const color = "#" + Math.floor(Math.random() * 12000000).toString(16);
        ctx.fillStyle = color;

        ctx.fillRect(x, y, 10, 10);
      }
    }
  }, [width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default RandomGitHubStyleAvatar;
