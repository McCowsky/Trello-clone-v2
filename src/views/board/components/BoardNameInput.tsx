import { useState } from "react";
import { useChangeBoardName } from "@/features/board/mutations";

const BoardNameInput: React.FC<{ boardName: string }> = ({ boardName }) => {
  const { mutate: updateBoardName } = useChangeBoardName();
  const [inputValue, setInputValue] = useState<string>(boardName);

  const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
    if (boardName !== event.currentTarget.value) updateBoardName(inputValue);
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };
  return (
    <input
      type="text"
      value={inputValue}
      onBlur={handleFocus}
      onChange={handleChange}
      className="bg-inherit text-white hover:bg-hover_grey active:bg-[#ffffff66] focus:bg-[#ffffff66] outline-none px-3 text-lg"
    />
  );
};

export default BoardNameInput;
