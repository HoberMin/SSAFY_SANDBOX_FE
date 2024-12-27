import { FileText } from 'lucide-react';

import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import TodoInput from '@/pages/CRUD/components/TodoInput';
import TodoItem from '@/pages/CRUD/components/TodoItem';
import { cn } from '@/utils/cn';

const dummyData = {
  todos: [
    { content: 'Vue.js 컴포넌트 기본 학습', completed: false, id: 1 },
    { content: 'Spring Boot 프로젝트 설정하기', completed: true, id: 2 },
    { content: 'Vue와 Vuex로 상태 관리 실습', completed: false, id: 3 },
    { content: 'Spring MVC 패턴 이해하기', completed: false, id: 4 },
    { content: 'Vue와 Spring을 연동한 REST API 구현', completed: true, id: 5 },
  ],
};

interface Tprops {
  currentStep: number;
}

const CRUD = ({ currentStep }: Tprops) => {
  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='할 일 관리'
        description='투두리스트 구현을 통해 CRUD 동작을 확인해보세요.'
      >
        <Button
          variant='outline'
          className={cn(
            'pointer-events-none gap-2 border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50',
            currentStep === 4 ? 'z-40' : 'z-10',
          )}
        >
          <FileText className='pointer-events-none h-4 w-4' />
          API 명세
        </Button>
      </MainLayout.Header>

      <MainLayout.Content className={currentStep === 5 ? 'z-40' : 'z-10'}>
        <div className='pointer-events-none space-y-6 p-4'>
          <TodoInput />

          <div className='max-h-[600px] overflow-y-auto rounded-lg border border-zinc-200 bg-white'>
            {dummyData.todos.map(({ content, completed, id }) => (
              <div
                key={`${content}-${id}`}
                className='border-b border-zinc-100 transition-colors duration-200 last:border-b-0 hover:bg-zinc-50'
              >
                <TodoItem checked={completed} todo={content} todoId={id} />
              </div>
            ))}
          </div>
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default CRUD;
