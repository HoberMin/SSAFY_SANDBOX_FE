import { getTodoApi } from '@/apis/todo';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  const { data, isPending, isError } = getTodoApi();

  if (isPending) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>fail to Fetch</div>;
  }

  // const newData = data.filter(e => e.userId === 1);

  return (
    <main className='flex h-screen w-full flex-col justify-center'>
      <div className='mx-auto flex w-[600px] flex-col gap-5'>
        <TodoInput />
        <div className='max-h-[600px] overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
          {/* 배열로 받아오면 순회하면서 Item 반환 */}
          {data.map(({ title, completed }) => (
            <TodoItem checked={completed} todo={title} />
          ))}
        </div>
        <span className='mt-[40px]'>Made By HoberMin / songhaeunsong</span>
      </div>
    </main>
  );
};

export default TodoContainer;
