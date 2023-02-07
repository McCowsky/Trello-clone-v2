import { BiDotsHorizontalRounded } from 'react-icons/Bi';
import { Menu, Transition } from '@headlessui/react';
import { useDeleteColumn } from '@/features/columns/mutations';

const ColumnMenu: React.FC<{ columnId: number; newTask: () => void }> = ({ columnId, newTask }) => {
  const { mutate: deleteColumn } = useDeleteColumn(columnId);

  const delColumn = (): void => {
    deleteColumn(columnId);
  };

  return (
    <Menu
      as="div"
      className="relative h-8 w-8 hover:bg-hover_grey_darker rounded flex justify-center items-center">
      <Menu.Button>
        <div className="w-8 h-8 flex justify-center items-center">
          <BiDotsHorizontalRounded className="" />
        </div>
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"></Transition>
      <Menu.Items className="absolute origin-top-right top-8 left-0 px-2 w-[304px] bg-white z-10">
        <Menu.Item disabled>
          <span className="opacity-75 flex justify-center text-text_grey h-10 items-center">
            List Actions
          </span>
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <p
              className={`${
                active && 'bg-hover_grey_darker'
              } mx-3 text-text_grey h-10 border-b-[1px] border-border_grey rounded flex items-center`}
              onClick={newTask}>
              Add card
            </p>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <p
              className={`${
                active && 'bg-hover_grey_darker'
              } mx-3 text-text_grey h-10 border-b-[1px] border-border_grey rounded flex items-center`}
              onClick={delColumn}>
              Delete list
            </p>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default ColumnMenu;
