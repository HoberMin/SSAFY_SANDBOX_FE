import { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/messaging';

import { FirebaseConfig, useGetFCMConfig, usePostFCMToken } from '@/apis/FCM';
import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import useDomainStore from '@/store';

const initializeFirebase = async (
  firebaseConfig: FirebaseConfig,
  vapidKey: string | undefined,
) => {
  firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  const token = await messaging.getToken({ vapidKey }).then(res => res);

  return token;
};

const FCMPage = () => {
  const { domain } = useDomainStore();
  const getConfig = useGetFCMConfig(domain);

  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig>({
    apiKey: undefined,
    authDomain: undefined,
    projectId: undefined,
    storageBucket: undefined,
    messagingSenderId: undefined,
    measurementId: undefined,
    appId: undefined,
  });
  const [vapidKey, setVapidKey] = useState<string | undefined>(undefined);
  const [deviceToken, setDeviceToken] = useState<string | undefined>(undefined);
  const postFCMToken = usePostFCMToken(domain);

  const handleGetFCMConfig = async () => {
    const {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
      vapidKey,
    } = await getConfig();

    setVapidKey(vapidKey);
    setFirebaseConfig(prevState => ({
      ...prevState,
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      measurementId,
      appId,
    }));
  };

  const handleGetFCMToken = async () => {
    if (!firebaseConfig.apiKey) return;
    const token = await initializeFirebase(firebaseConfig, vapidKey);
    setDeviceToken(token);
  };

  const handlePostDeviceToken = async () => {
    if (!deviceToken) return;
    await postFCMToken(deviceToken);
  };

  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='FCM 설정'
        description='Firebase Cloud Messaging 설정을 진행해주세요.'
      >
        <InfoModal file='fcm' />
      </MainLayout.Header>

      <MainLayout.Content>
        <div className='space-y-6'>
          <div className='space-y-4 rounded-lg border border-zinc-200 bg-white p-6'>
            <div className='space-y-4'>
              <div className='grid grid-cols-2 gap-3'>
                {Object.entries(firebaseConfig).map(([key, value]) => (
                  <div
                    key={key}
                    className='flex flex-col rounded-md bg-zinc-50 p-3'
                  >
                    <span className='text-sm font-bold font-medium text-zinc-700'>
                      {key}
                    </span>
                    <span className='mt-1 break-all text-sm text-zinc-600'>{`${value || '-'}`}</span>
                  </div>
                ))}
              </div>
              <Button className='w-full' onClick={handleGetFCMConfig}>
                FCM 설정 가져오기
              </Button>
            </div>

            <div className='space-y-4'>
              <div className='rounded-md bg-zinc-50 p-3'>
                <p className='break-all text-sm text-zinc-600'>
                  {deviceToken || '기기토큰이 없습니다'}
                </p>
              </div>
              <Button
                className='w-full'
                disabled={!firebaseConfig.apiKey}
                onClick={handleGetFCMToken}
              >
                디바이스 토큰 가져오기
              </Button>
            </div>

            <Button
              className='w-full'
              disabled={!deviceToken}
              onClick={handlePostDeviceToken}
            >
              디바이스 토큰 저장
            </Button>
          </div>
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default FCMPage;
