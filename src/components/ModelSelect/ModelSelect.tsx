import React, { useState } from "react"

interface ModelSelectProps {
    model: string
    setModel: React.Dispatch<React.SetStateAction<string>>
}

const ModelSelect: React.FC<ModelSelectProps> = ({ model, setModel }) => {
	const [selectedModel, setSelectedModel] = useState<string>(model)

	const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedModel(event.target.value)
        setModel(event.target.value)
	};

	return (
		<div>
			<label htmlFor="modelSelect" className="mr-2 font-semibold">
				Select Model:
			</label>
			<select
				id="modelSelect"
				value={selectedModel}
				onChange={handleModelChange}
				className="border border-gray-300 rounded p-2"
			>
				<option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
				<option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
				<option value="gpt-3.5-turbo-0613">gpt-3.5-turbo-0613</option>
                <option value="gpt-3.5-turbo-16k-0613">gpt-3.5-turbo-16k-0613</option>
			</select>
		</div>
	)
}

export default ModelSelect