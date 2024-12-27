import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServerInputHttp = () => {
  return (
    <main className='flex w-full grow flex-col justify-center'>
      <div className='mx-auto flex w-[500px] flex-col rounded-md border-2 border-solid border-gray-100 px-12 py-8'>
        <div className='mb-[20px]'>
          <h3 className='mb-[10px] text-xl font-bold'>Base URL</h3>
          <p>개발한 서버의 Base URL을 입력해주세요.</p>
        </div>
        <Tabs defaultValue='local' className='z-40 bg-white p-3'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='local'>Development</TabsTrigger>
            <TabsTrigger value='deployed' disabled>
              Production
            </TabsTrigger>
          </TabsList>
          <TabsContent value='local' className='mt-4'>
            <div className='flex gap-2'>
              <Input
                className='w-[80px] bg-zinc-50 text-center text-zinc-800'
                value='http://'
                disabled
              />
              <Input
                className='flex-1 focus-visible:ring-zinc-400'
                placeholder='localhost:8080/api/v1'
              />
              <Button className='w-16 bg-zinc-800 text-xs text-white hover:bg-zinc-700'>
                Save
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServerInputHttp;
