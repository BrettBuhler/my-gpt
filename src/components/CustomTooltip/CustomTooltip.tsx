import React from "react"
import { useState } from "react";

interface CustomTooltipProps {
    text: string;
    position?: "top" | "right" | "bottom" | "left"
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ text, position = "top" }) => {
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setTooltipPosition({ x, y })
    }

    const tooltipStyle = {
        top: tooltipPosition.y + "px",
        left: tooltipPosition.x + "px",
    }

    return (
        <div className={`tooltip tooltip-${position}`} onMouseMove={handleMouseMove}>
        <span className="absolute" style={tooltipStyle}>{text}</span>
        </div>
    )
}

export default CustomTooltip;