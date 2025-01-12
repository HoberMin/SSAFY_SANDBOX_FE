import { useEffect, useState } from 'react';

import {
  reissueWithAuthorization,
  useGetMemberWithAuthorizationApi,
  usePostLogoutWithAuthorizationApi,
} from '@/apis/authentication';
import useDomainStore from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthAuthorization = () => {
  const { domain } = useDomainStore();
  const [nickname, setNickname] = useState<string | null>(null);

  const getMemberWithAuthorization = useGetMemberWithAuthorizationApi(domain);

  const logoutWithAuthorization = usePostLogoutWithAuthorizationApi();

  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMemberWithAuthorization();
    setNickname(nickname);
  };

  useEffect(() => {
    if (domain) handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    reissueWithAuthorization();
  };

  const handleLogout = () => {
    logoutWithAuthorization();
    setNickname(null);
  };

  return (
    <div className='p-4 space-y-6'>
      <main className='flex flex-col justify-center w-full h-full gap-5'>
        <div className='mx-auto flex w-[600px] flex-col items-center'>
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

export default OAuthAuthorization;
