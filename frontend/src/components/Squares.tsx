import React, { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
	x: number;
	y: number;
}

interface SquaresProps {
	direction?: "diagonal" | "up" | "right" | "down" | "left";
	speed?: number;
	borderColor?: CanvasStrokeStyle;
	squareSize?: number;
	hoverFillColor?: CanvasStrokeStyle;
	theme?: "light" | "dark";
}

const Squares: React.FC<SquaresProps> = ({
	direction = "right",
	speed = 1,
	borderColor,
	squareSize = 40,
	hoverFillColor,
	theme = "light",
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const requestRef = useRef<number | null>(null);
	const numSquaresX = useRef<number>(0);
	const numSquaresY = useRef<number>(0);
	const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
	const hoveredSquareRef = useRef<GridOffset | null>(null);

	// Set default colors based on theme
	const lightModeBorder = "#3B82F6"; // Nice blue color
	const lightModeHover = "#EC4899"; // Vibrant pink
	const darkModeBorder = "#fff"; // White
	const darkModeHover = "#fff"; // White

	const effectiveBorderColor = borderColor || (theme === "light" ? lightModeBorder : darkModeBorder);
	const effectiveHoverColor = hoverFillColor || (theme === "light" ? lightModeHover : darkModeHover);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
			numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const drawGrid = () => {
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
			const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

			for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
				for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
					const squareX = x - (gridOffset.current.x % squareSize);
					const squareY = y - (gridOffset.current.y % squareSize);

					if (
						hoveredSquareRef.current &&
						Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
						Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
					) {
						ctx.fillStyle = effectiveHoverColor;
						ctx.fillRect(squareX, squareY, squareSize, squareSize);
					}

					ctx.strokeStyle = effectiveBorderColor;
					ctx.lineWidth = theme === "light" ? 1.5 : 1; // Thicker lines in light mode
					ctx.strokeRect(squareX, squareY, squareSize, squareSize);
				}
			}

			// Add subtle gradient overlay based on theme
			const gradient = ctx.createRadialGradient(
				canvas.width / 2,
				canvas.height / 2,
				0,
				canvas.width / 2,
				canvas.height / 2,
				Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
			);

			if (theme === "light") {
				gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
				gradient.addColorStop(1, "rgba(255, 255, 255, 0.9)");
			} else {
				gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
				gradient.addColorStop(1, "#060606");
			}

			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		};

		const updateAnimation = () => {
			const effectiveSpeed = Math.max(speed, 0.1);
			switch (direction) {
				case "right":
					gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
					break;
				case "left":
					gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
					break;
				case "up":
					gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
					break;
				case "down":
					gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
					break;
				case "diagonal":
					gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
					gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
					break;
				default:
					break;
			}

			drawGrid();
			requestRef.current = requestAnimationFrame(updateAnimation);
		};

		const handleMouseMove = (event: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
			const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

			const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
			const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

			if (
				!hoveredSquareRef.current ||
				hoveredSquareRef.current.x !== hoveredSquareX ||
				hoveredSquareRef.current.y !== hoveredSquareY
			) {
				hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
			}
		};

		const handleMouseLeave = () => {
			hoveredSquareRef.current = null;
		};

		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseleave", handleMouseLeave);
		requestRef.current = requestAnimationFrame(updateAnimation);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [direction, speed, squareSize, theme, effectiveBorderColor, effectiveHoverColor]);

	return <canvas ref={canvasRef} className="w-full h-full border-none block" />;
};

export default Squares;
