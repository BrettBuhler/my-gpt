import React, { useState } from "react";

interface RememberChatHistoryProps {
    rememberHistory: boolean
    setRememberHistory: React.Dispatch<React.SetStateAction<boolean>>
}

const RememberChatHistory: React.FC<RememberChatHistoryProps> = ({ rememberHistory, setRememberHistory }) => {


	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRememberHistory(event.target.checked);
	};

	return (
		<div className="flex items-center justify-between">
			<label htmlFor="rememberCheckbox" className="mr-2 font-semibold">
				Remember Chat History:
			</label>
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