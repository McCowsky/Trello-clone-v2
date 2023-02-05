import TextareaAutosize from "react-textarea-autosize";
import { useUpdateTaskName } from "@/features/tasks/mutations";
import { useState, useRef } from "react";

const TaskInput: React.FC<{ columnId: number; taskId: number; taskName: string }> = ({
  columnId,
  taskId,
  taskName,
}) => {
  const { mutate: updateTask } = useUpdateTaskName(columnId, taskId);
  const [inputValue, setInputValue] = useState(taskName);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    if (taskName !== event.currentTarget.value) updateTask(inputValue);
  };
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <TextareaAutosize
      rows={1}
      ref={ref}
      value={inputValue}
      onBlur={handleFocus}
      onChange={handleChange}
      className="bg-inherit w-48 resize-none outline-none focus:shadow-[0_0_0_2px_rgba(0,121,191,1)] rounded-[3px] text-text_grey"
      autoFocus
    />
  );
};

export default TaskInput;
