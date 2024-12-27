import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import useDomainStore from '@/store';

import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const ServerInputModal = () => {
  const queryClient = useQueryClient();

  const [localURL, setLocalURL] = useState('');
  const [deployedURL, setDeployedURL] = useState('');
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  const { setDomain } = useDomainStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  const activeEnterLocalURL = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onsubmitLocalURL();
  };

  const activeEnterDeployedURL = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onsubmitDeployedURL();
  };

  const onsubmitLocalURL = () => {
    if (!localURL.trim()) return;
    setDomain(`http://${localURL}`);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    closeModal();
  };

  const onsubmitDeployedURL = () => {
    if (!deployedURL.trim()) return;
    setDomain(`https://${deployedURL}`);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    closeModal();
  };

  const closeModal = () => {
    setIsOpenedModal(false);
    setLocalURL('');
    setDeployedURL('');
  };

  return (
    <Dialog open={isOpenedModal} onOpenChange={setIsOpenedModal}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
          onClick={() => setIsOpenedModal(true)}
        >
          Edit Base URL
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-zinc-800'>Edit Base URL</DialogTitle>
          <DialogDescription className='text-sm text-zinc-500'>
            개발 또는 배포된 서버의 Base URL를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='local' className='mt-4'>
          <TabsList className='grid w-full grid-cols-2 bg-zinc-100'>
            <TabsTrigger
              value='local'
              className='data-[state=active]:bg-white data-[state=active]:text-zinc-900'
            >
              Development
            </TabsTrigger>
            <TabsTrigger
              value='deployed'
              className='data-[state=active]:bg-white data-[state=active]:text-zinc-900'
            >
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
                value={localURL}
                onChange={e => handleInputChange(e, setLocalURL)}
                onKeyDown={activeEnterLocalURL}
                placeholder='localhost:8080/api/v1'
              />
              <Button
                onClick={onsubmitLocalURL}
                className='w-16 bg-zinc-800 text-xs text-white hover:bg-zinc-700'
              >
                Save
              </Button>
            </div>
          </TabsContent>
          <TabsContent value='deployed' className='mt-4'>
            <div className='flex gap-2'>
              <Input
                className='w-[80px] bg-zinc-50 text-center text-zinc-800'
                value='https://'
                disabled
              />
              <Input
                className='flex-1 focus-visible:ring-zinc-300'
                value={deployedURL}
                onChange={e => handleInputChange(e, setDeployedURL)}
                onKeyDown={activeEnterDeployedURL}
                placeholder='api.yourserver.com/v1'
              />
              <Button
                onClick={onsubmitDeployedURL}
                className='w-16 bg-zinc-800 text-xs text-white hover:bg-zinc-700'
              >
                Save
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServerInputModal;
