import { useEffect, useState } from 'react';

import {
  reissue,
  useGetMemberApi,
  usePostLogoutApi,
} from '@/apis/authentication';
import useDomainStore from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthMix = () => {
  const { domain } = useDomainStore();
  const [nickname, setNickname] = useState<string | null>(null);

  const getMember = useGetMemberApi(domain);
  const postLogout = usePostLogoutApi(domain);

  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMember();
    setNickname(nickname);
  };

  useEffect(() => {
    if (domain) handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    reissue();
  };

  const handleLogout = () => {
    postLogout();
    setNickname(null);
  };

  return (
    <div className='space-y-6 p-4'>
      <main className='flex h-full w-full flex-col items-center justify-center gap-5'>
        <div className='flex w-[600px] flex-col items-center'>
          {nickname ? (
            <div className='flex gap-5'>
              <button
                onClick={handleLogout}
                className='h-[50px] w-[100px] rounded-[7px] bg-[#fee501]'
              >
                로그아웃
              </button>
              <button
                className='h-[50px] w-[100px] rounded-[5px] border'
                onClick={handleReissue}
              >
                Reissue
              </button>
            </div>
          ) : (
            <div className='w-[100px]'>
              <OAuthKakaoButton />
            </div>
          )}
        </div>
        <div className='mx-auto flex w-[400px]'>
          <OAuthUserInfo
            nickName={nickname}
            handleCheckSignInStatus={handleCheckSignInStatus}
          />
        </div>
      </main>
    </div>
  );
};

export default OAuthMix;
