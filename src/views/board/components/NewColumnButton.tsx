import { useAddColumn } from "@/features/columns/mutations";

const NewColumnButton: React.FC = () => {
  const { mutate: addColumn } = useAddColumn();

  const newColumn = (): void => {
    addColumn();
  };

  return (
    <button
      className="bg-white/[0.24] text-white p-1 ml-1 mr-2 w-[272px] h-10 hover:bg-white/30 text-left rounded flex items-center"
      onClick={newColumn}
    >
      <span className="text-2xl relative">
        +<span className="text-sm">Add another list</span>
      </span>
    </button>
  );
};

export default NewColumnButton;
