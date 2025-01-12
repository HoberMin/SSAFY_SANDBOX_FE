import { Trash2 } from 'lucide-react';

import { useDeleteTodoApi } from '@/apis/todo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useDomainStore from '@/store';

const TodoEditIcon = ({ todoId }: { todoId: number }) => {
  const { domain } = useDomainStore();
  const deleteTodo = useDeleteTodoApi(domain);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    deleteTodo(todoId);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={e => handleDelete(e)}
            className='rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-500'
          >
            <Trash2 className='h-4 w-4' />
          </button>
        </TooltipTrigger>
        <TooltipContent>삭제하기</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TodoEditIcon;
