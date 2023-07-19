import { useState } from "react"

interface ItemInputProps {
    items: string[]
    setItems: React.Dispatch<React.SetStateAction<string[]>>
}

const ItemInput: React.FC<ItemInputProps> = ({ items, setItems }) => {


    const handleAddItem = () => {
        if (items.length < 4) {
            if (!items.includes("")){
                setItems([...items, ""])
            } 
        }
  }

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  return (
    <div className="w-full">
        <div className="flex flex-wrap w-full" style={{maxWidth: "300px"}}>
            {items.map((item, index) => (
            <div key={index} className="flex items-center mb-2 mr-2" style={{maxWidth: "140px"}}>
            <input
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className=" py-1 px-2 border border-gray-300 rounded-l focus:outline-none w-4/5"
            />
            <button
                onClick={() => handleDeleteItem(index)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-r w-1/5"
            >
                X
            </button>
            </div>
        ))}
        </div>
      {items.length < 4 && (
        <div className="flex items-center">
          <button
            onClick={handleAddItem}
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded"
            style={{width: "140px"}}
          >
            Add
          </button>
        </div>
      )}
    </div>
  )
}

export default ItemInput;
