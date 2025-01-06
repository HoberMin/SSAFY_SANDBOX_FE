import { ChangeEvent, useEffect, useRef } from 'react';

import {
  getPreSignedUrlAPI,
  postImageUrlAPI,
  putImageAPI,
  useGetImageAPI,
} from '@/apis/imageUpload';
import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import MainLayout from '@/components/MainLayout';
import { useToast } from '@/components/toast/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDomainStore from '@/store';

const FileUploader = () => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const { domain } = useDomainStore();
  const { toast } = useToast();

  const {
    data: currentImage,
    isLoading: isLoadingImage,
    isError: isCurrentImageError,
  } = useGetImageAPI(domain);

  const {
    data: preSignedData,
    isLoading: isLoadingPresigned,
    isError: isPresignedError,
  } = getPreSignedUrlAPI(domain);

  const putImage = putImageAPI(preSignedData?.presignedUrl || '');
  const extractBaseUrl = (url: string) => url.split('?')[0];
  const postImageUrl = postImageUrlAPI(
    preSignedData?.presignedUrl
      ? extractBaseUrl(preSignedData.presignedUrl)
      : '',
  );

  useEffect(() => {
    if (isCurrentImageError) {
      toast({
        title: '이미지 로드 실패',
        description: '현재 이미지를 불러오는데 실패했습니다.',
        variant: 'destructive',
      });
    }
  }, [isCurrentImageError]);

  useEffect(() => {
    if (isPresignedError) {
      toast({
        title: '업로드 준비 실패',
        description: '이미지 업로드 준비 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  }, [isPresignedError]);

  const handleImageRemove = () => {
    if (inputElement.current) {
      inputElement.current.value = '';
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: '파일 크기 초과',
        description: '5MB 이하의 이미지만 업로드 가능합니다.',
        variant: 'destructive',
      });
      return;
    }

    try {
      putImage(file);
      toast({
        title: '이미지 업로드 완료',
        description: '이미지가 성공적으로 업로드되었습니다.',
      });
    } catch (error) {
      toast({
        title: '이미지 업로드 실패',
        description: '이미지 업로드 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
      handleImageRemove();
    }
  };

  const handleSubmitImage = async () => {
    try {
      postImageUrl();
      toast({
        title: '이미지 전송 성공',
        description: '이미지가 성공적으로 저장되었습니다.',
      });
      handleImageRemove();
    } catch (error) {
      toast({
        title: '이미지 전송 실패',
        description: '이미지 저장 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
      console.error('Save error:', error);
    }
  };

  const renderImagePreview = () => {
    if (isLoadingImage) {
      return <div className='loading-spinner' />;
    }

    if (preSignedData?.presignedUrl) {
      return (
        <img
          src={preSignedData.presignedUrl}
          alt='업로드된 이미지'
          className='h-32 w-32 rounded-lg border border-gray-200 object-cover shadow-sm'
        />
      );
    }

    if (currentImage?.imageUrl) {
      return (
        <img
          src={currentImage.imageUrl}
          alt='현재 이미지'
          className='h-32 w-32 rounded-lg border border-gray-200 object-cover shadow-sm'
        />
      );
    }

    return (
      <div className='flex h-32 w-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400'>
        <span>이미지 미리보기</span>
      </div>
    );
  };

  if (!domain) {
    return (
      <MainLayout.Root>
        <MainLayout.Header title='이미지 전송' />
        <MainLayout.Content>
          <NotDomainAlertBox />
        </MainLayout.Content>
      </MainLayout.Root>
    );
  }

  const isImageSelectDisabled = isPresignedError || isLoadingPresigned;

  const isUploadDisabled =
    !preSignedData?.presignedUrl || isLoadingPresigned || isPresignedError;

  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='이미지 전송'
        description='이미지를 업로드하고 전송하세요.'
      />
      <MainLayout.Content>
        <div className='mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-white p-6 shadow'>
          {renderImagePreview()}

          <div className='flex items-center gap-4'>
            <Label
              htmlFor='picture'
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                isImageSelectDisabled
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'cursor-pointer bg-white text-gray-700 shadow-sm hover:bg-gray-50'
              }`}
            >
              이미지 선택
            </Label>
            <Label
              onClick={
                preSignedData?.presignedUrl ? handleImageRemove : undefined
              }
              className={`rounded-md border px-4 py-2 text-sm font-medium transition ${
                preSignedData?.presignedUrl
                  ? 'cursor-pointer text-red-500 hover:bg-red-50'
                  : 'cursor-not-allowed text-gray-400'
              }`}
            >
              이미지 삭제
            </Label>
          </div>

          <Input
            id='picture'
            type='file'
            ref={inputElement}
            accept='image/*'
            className='hidden'
            onChange={handleImageUpload}
            disabled={isImageSelectDisabled}
          />

          <Button
            onClick={handleSubmitImage}
            disabled={isUploadDisabled}
            className={`w-full rounded-md px-4 py-2 font-medium text-white transition ${
              isUploadDisabled
                ? 'cursor-not-allowed bg-gray-300'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            이미지 전송
          </Button>
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default FileUploader;
