import { ClipboardList } from 'lucide-react';

import { useGetTodoAPI } from '@/apis/todo';
import ResponseErrorAlertBox from '@/components/AlertBox/ResponseErrorAlertBox';
import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import Spinner from '@/components/Spinner';
import useDomainStore from '@/store';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const EmptyTodoState = () => (
  <div className='flex flex-col items-center rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-16'>
    <div className='rounded-full bg-zinc-100 p-3'>
      <ClipboardList className='h-6 w-6 text-zinc-500' />
    </div>
    <p className='mt-4 font-medium text-zinc-700'>할 일이 없습니다</p>
    <p className='mt-1 text-sm text-zinc-500'>새로운 할 일을 추가해보세요</p>
  </div>
);

const TodoList = () => {
  const { domain } = useDomainStore();
  const { data, isError, isPending } = useGetTodoAPI(domain);

  if (isPending) {
    return <Spinner text='로딩중' />;
  }

  if (isError || data.todos === undefined) {
    return <ResponseErrorAlertBox />;
  }

  return (
    <div className='space-y-4'>
      <TodoInput />

      {data.todos.length === 0 ? (
        <EmptyTodoState />
      ) : (
        <div className='max-h-[600px] overflow-y-auto rounded-lg border border-zinc-200 bg-white'>
          {data.todos.map(({ content, completed, id }) => (
            <div
              key={`${content}-${id}`}
              className='border-b border-zinc-100 transition-colors duration-200 last:border-b-0 hover:bg-zinc-50'
            >
              <TodoItem checked={completed} todo={content} todoId={id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TodoContainer = () => {
  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='할 일 관리'
        description='투두리스트 구현을 통해 CRUD 동작을 확인해보세요.'
      >
        <InfoModal file='crud' />
      </MainLayout.Header>

      <MainLayout.Content>
        <div className='space-y-6 p-4'>
          <TodoList />
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default TodoContainer;
