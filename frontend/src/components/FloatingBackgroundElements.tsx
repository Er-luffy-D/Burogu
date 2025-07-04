import { useEffect } from "react";

export const FloatingBackgroundElements = ({ i }: { i: number }) => {
	useEffect(() => {
		const container = document.querySelector(".floating-elements-container");
		if (!container) return;

		const elements = Array.from({ length: i }, () => {
			const element = document.createElement("div");
			element.className = "floating-element";
			const size = Math.random() * 100 + 50;
			element.style.width = `${size}px`;
			element.style.height = `${size}px`;
			element.style.top = `${Math.random() * 100}%`;
			element.style.left = `${Math.random() * 100}%`;
			element.style.opacity = "0.3";
			element.style.border = "2px solid rgba(156, 163, 175, 0.5)";
			element.style.borderRadius = "0.5rem";
			element.style.position = "absolute";

			const duration = Math.random() * 10 + 10;
			const yMovement = Math.random() * 100 - 50;
			const xMovement = Math.random() * 100 - 50;

			element.style.animation = `
        float ${duration}s infinite alternate-reverse
      `;

			const style = document.createElement("style");
			style.textContent = `
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(${xMovement}px, ${yMovement}px) rotate(${Math.random() * 360}deg);
          }
        }
      `;

			document.head.appendChild(style);
			return element;
		});

		elements.forEach((el) => container.appendChild(el));

		return () => {
			elements.forEach((el) => el.remove());
		};
	}, []);

	return (
		<div className="floating-elements-container absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none" />
	);
};
