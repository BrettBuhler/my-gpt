interface SliderSelectProps {
    min: number
    max: number
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
    isInt?: boolean
}

const SliderSelect: React.FC<SliderSelectProps> = ({min, max, value, setValue, isInt = false}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value)
        setValue(newValue)
    }

    return (
        <div className="flex items-center">
            <input
                type="range"
                min={min}
                max={max}
                step={!isInt ? 0.01 : 1}
                value={value}
                onChange={handleChange}
                className="w-64 h-4 rounded-md appearance-none bg-gray-300 outline-none"
            />
            <span className="ml-2 text-gray-600">{!isInt ? value.toFixed(2) : value}</span>
        </div>
    )
}

export default SliderSelect