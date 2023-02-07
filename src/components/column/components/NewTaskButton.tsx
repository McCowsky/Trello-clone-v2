const NewTaskButton: React.FC<{ newTask: () => void }> = ({ newTask }) => {
  return (
    <button
      className="text-left mx-2 px-2 py-1 h-[28px] hover:bg-hover_grey_darker rounded-sm mb-2 flex items-center"
      onClick={newTask}>
      <span className="text-2xl text-text_grey">
        + <span className="text-sm ">Add card</span>
      </span>
    </button>
  );
};

export default NewTaskButton;
