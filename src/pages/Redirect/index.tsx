import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  usePostCodeApi,
  usePostCodeWithAuthorizationApi,
  usePostCodeWithCookieApi,
} from '@/apis/authentication';
import useDomainStore, { useTokenTypeStore } from '@/store';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const { tokenType } = useTokenTypeStore();

  const code = searchParams.get('code');
  const { domain } = useDomainStore();

  const postCode = usePostCodeApi(domain);
  const postCodeWithAuthorization = usePostCodeWithAuthorizationApi(domain);
  const postCodeWithCookie = usePostCodeWithCookieApi(domain);

  useEffect(() => {
    if (code) {
      if (tokenType === 0) postCode(code);
      else if (tokenType === 1) postCodeWithCookie(code);
      else postCodeWithAuthorization(code);
    }
  }, [code]);

  return <div></div>;
};
export default RedirectPage;
