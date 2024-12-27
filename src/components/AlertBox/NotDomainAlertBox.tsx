import { AlertCircle, ArrowUp } from 'lucide-react';

const NotDomainBox = () => (
  <div className='flex flex-col gap-3'>
    <div className='rounded-lg border-l-4 border-l-red-500 bg-red-50 p-4'>
      <div className='flex items-center gap-2 text-red-600'>
        <AlertCircle className='h-5 w-5' />
        <span className='font-medium'>Base URL 미설정 오류</span>
      </div>
    </div>
    <div className='rounded-lg bg-zinc-50 p-4'>
      <div className='flex items-center gap-2 text-zinc-600'>
        <ArrowUp className='h-4 w-4 animate-bounce' />
        <span className='text-sm'>
          상단 'Edit Base URL' 버튼에서 서버 URL을 등록해주세요!
        </span>
      </div>
    </div>
  </div>
);

export default NotDomainBox;
