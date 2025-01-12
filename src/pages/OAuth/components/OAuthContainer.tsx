import { useEffect, useState } from 'react';

import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import { useTokenTypeStore } from '@/store';

import OAuthAuthorization from './OAuthAuthorization';
import OAuthCookie from './OAuthCookie';
import OAuthMix from './OAuthMix';
import { OAuthTypeMenu } from './OAuthTypeMenu';

type InfoFileType = string[];
const infoFile: InfoFileType = ['oauth', 'oauth_cookie', 'oauth_authorization'];

const OAuthContainer = () => {
  const { tokenType } = useTokenTypeStore();
  const [currentInfoFile, setCurrentInfoFile] = useState('oauth');

  useEffect(() => {
    setCurrentInfoFile(infoFile[tokenType]);
  }, [tokenType]);

  const OauthComponent = () =>
    tokenType === 0 ? (
      <OAuthMix />
    ) : tokenType === 1 ? (
      <OAuthCookie />
    ) : tokenType === 2 ? (
      <OAuthAuthorization />
    ) : null;

  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='OAuth'
        description='카카로 로그인을 구현해서 OAuth 인증 로직을 구현해보세요.'
      >
        <OAuthTypeMenu />
        <InfoModal file={currentInfoFile} key={currentInfoFile} />
      </MainLayout.Header>
      <MainLayout.Content>
        <OauthComponent />
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default OAuthContainer;
