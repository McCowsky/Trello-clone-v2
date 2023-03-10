import TextareaAutosize from 'react-textarea-autosize';
import { useState, useRef } from 'react';
import { useUpdateColumnName } from '@/features/columns/mutations';

const ColumnNameInput: React.FC<{ columnName: string; columnId: number }> = ({
  columnName,
  columnId
}) => {
  const [inputValue, setInputValue] = useState<string>(columnName);
  const { mutate: updateColumn } = useUpdateColumnName(columnId);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    if (columnName !== event.currentTarget.value) updateColumn(inputValue);
  };
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  const setFocus = (): void => {
    ref.current?.focus();
  };

  return (
    <div className="relative w-full">
      <TextareaAutosize
        rows={1}
        ref={ref}
        value={inputValue}
        onBlur={handleFocus}
        onChange={handleChange}
        className="bg-bg_column pl-2 h-7 w-full outline-none focus:shadow-[0_0_0_2px_rgba(0,121,191,1)] rounded-[3px] py-[2px] resize-none "
        autoFocus
        id="columnName"
        data-testid="ColumnNameInput"
      />
      <div className="absolute top-0 w-full h-full" onClick={setFocus}></div>
    </div>
  );
};

export default ColumnNameInput;
