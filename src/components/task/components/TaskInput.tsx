import TextareaAutosize from 'react-textarea-autosize';
import { useUpdateTaskName } from '@/features/tasks/mutations';
import { useState, useRef } from 'react';

const TaskInput: React.FC<{ columnId: number; taskId: number; taskName: string }> = ({
  columnId,
  taskId,
  taskName
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

  const setFocus = () => {
    ref.current?.focus();
  };

  return (
    <div className="relative w-full  mr-2">
      <TextareaAutosize
        rows={1}
        ref={ref}
        value={inputValue}
        onBlur={handleFocus}
        onChange={handleChange}
        className="bg-inherit w-full resize-none outline-none focus:shadow-[0_0_0_2px_rgba(0,121,191,1)] rounded-[3px] text-text_grey pl-2 "
        autoFocus
      />
      <div className="absolute w-full h-full top-0" onClick={setFocus}></div>
    </div>
  );
};

export default TaskInput;
