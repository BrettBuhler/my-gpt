import React from "react"

import CustomTooltip from "../CustomTooltip/CustomTooltip"

interface RememberChatHistoryProps {
    rememberHistory: boolean
    setRememberHistory: React.Dispatch<React.SetStateAction<boolean>>
	isRememberHistoryTooltip: boolean
	setIsRememberHistoryTooltip: React.Dispatch<React.SetStateAction<boolean>>
	handleMouseEnter: (event: React.MouseEvent) => void
	tooltipPosition: {x: number, y: number}
}

const RememberChatHistory: React.FC<RememberChatHistoryProps> = ({ rememberHistory, setRememberHistory, isRememberHistoryTooltip, setIsRememberHistoryTooltip, handleMouseEnter, tooltipPosition }) => {


	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRememberHistory(event.target.checked);
	};

	const adjustPosition = (x: number, y: number) => {
		const newX = x
		const newY = y - 130
		return {x: newX, y: newY}
	}

	return (
		<div className="flex items-center justify-between">
			<label id="rem_his"htmlFor="rememberCheckbox" className="mr-2 font-semibold" onMouseEnter={handleMouseEnter} onMouseLeave={()=>setIsRememberHistoryTooltip(false)}>
				Remember Chat History:
			</label>
			{isRememberHistoryTooltip && (
				<CustomTooltip text="When you check 'Remember History', your chat's history will be sent along with your new request. This feature enhances the response's relevancy by providing additional context, but it might consume more prompt tokens." position={adjustPosition(tooltipPosition.x, tooltipPosition.y)} />
			)}
			<input
				type="checkbox"
				id="rememberCheckbox"
				checked={rememberHistory}
				onChange={handleCheckboxChange}
				className="form-checkbox h-4 w-4 text-emerald-600 mr-6"
			/>
		</div>
	);
};

export default RememberChatHistory;