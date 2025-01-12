import { useMutation } from '@tanstack/react-query';
import { KyRequest } from 'ky';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';
import useDomainStore, { Domain } from '@/store';

import {
  ApiClient,
  ApiClientWithAuthorization,
  ApiClientWithCookie,
  api,
} from './client';

interface TokenResponse {
  accessToken: string;
}

interface TokenWithAuthorizationResponse {
  accessToken: string;
  refreshToken: string;
}

interface Member {
  nickname: string | null;
}

let accessToken = '';

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => (accessToken = token);

const getClientID = (domain: Domain) => {
  return ApiClient.get(`${domain}/clientid`).json();
};

export const useGetClientID = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getClientID(domain),
  });

  return mutateAsync;
};

const postCode = async (
  code: string,
  domain: Domain,
): Promise<TokenResponse> => {
  const response = await api.post(`${domain}/oauth/auth`, {
    json: { code },
  });

  return await response.json();
};

const postCodeWithAuthorization = async (
  code: string,
  domain: Domain,
): Promise<TokenWithAuthorizationResponse> => {
  const response = await api.post(`${domain}/oauth/authorization/auth`, {
    json: { code },
  });

  return await response.json();
};

const postCodeWithCookie = async (
  code: string,
  domain: Domain,
): Promise<TokenResponse> =>
  await api.post(`${domain}/oauth/cookie/auth`, { json: { code } }).json();

export const usePostCodeApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code, domain),
    onSuccess: (res: TokenResponse) => {
      accessToken = res.accessToken;
      navigate(`/oauth`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth`);
    },
  });

  return mutate;
};

export const usePostCodeWithAuthorizationApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCodeWithAuthorization(code, domain),
    onSuccess: (res: TokenWithAuthorizationResponse) => {
      accessToken = res.accessToken;
      localStorage.setItem('refreshToken-storage', res.refreshToken);

      navigate(`/oauth`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth`);
    },
  });

  return mutate;
};

export const usePostCodeWithCookieApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCodeWithCookie(code, domain),
    onSuccess: () => {
      navigate(`/oauth`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth`);
    },
  });

  return mutate;
};

const getMember = (domain: Domain): Promise<Member> => {
  return ApiClient.get(`${domain}/oauth/member`).json();
};

const getMemberWithAuthorization = (domain: Domain): Promise<Member> => {
  return ApiClientWithAuthorization.get(
    `${domain}/oauth/authorization/member`,
  ).json();
};

const getMemberWithCookie = (domain: Domain): Promise<Member> => {
  return ApiClientWithCookie.get(`${domain}/oauth/cookie/member`).json();
};

export const useGetMemberApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(domain),
  });

  return mutateAsync;
};

export const useGetMemberWithAuthorizationApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMemberWithAuthorization(domain),
  });

  return mutateAsync;
};

export const useGetMemberWithCookieApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMemberWithCookie(domain),
  });

  return mutateAsync;
};

export const getReissue = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClient.get(`${domain}/oauth/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      return ApiClient(request);
    })
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

export const getReissueWithAuthorization = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClientWithAuthorization.get(`${domain}/oauth/authorization/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      return ApiClientWithAuthorization(request);
    })
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

export const getReissueWithCookie = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClientWithCookie.get(`${domain}/oauth/cookie/reissue`)
    .then(() => ApiClientWithCookie(request))
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

export const reissue = () => {
  const { domain } = useDomainStore.getState();

  return ApiClient.get(`${domain}/oauth/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      toast({
        variant: 'default',
        title: 'reissue 요청 성공 !!',
        description: 'access-token이 정상적으로 재발급되었습니다.',
      });
    })
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

export const reissueWithAuthorization = () => {
  const { domain } = useDomainStore.getState();

  ApiClientWithAuthorization.get(`${domain}/oauth/authorization/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      toast({
        variant: 'default',
        title: 'reissue 요청 성공 !!',
        description: 'access-token이 정상적으로 재발급되었습니다.',
      });
    })
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

export const reissueWithCookie = () => {
  const { domain } = useDomainStore.getState();

  ApiClientWithCookie.get(`${domain}/oauth/cookie/reissue`)
    .then(() =>
      toast({
        variant: 'default',
        title: 'reissue 요청 성공 !!',
        description: 'access-token이 정상적으로 재발급되었습니다.',
      }),
    )
    .catch(error => {
      const descriptions: Record<string, string> = {
        ERR_ACCESS_TOKEN_EXPIRED: 'refresh-token이 만료되었습니다.',
        ERR_MISSING_ACCESS_TOKEN: 'refresh-token이 없습니다.',
      };

      const description =
        descriptions[error.response?.data?.code] || '네트워크 탭을 확인하세요.';

      toast({
        variant: 'destructive',
        title: '토큰 재발급에 실패했습니다.',
        description,
      });
    });
};

const postLogout = (domain: Domain) => ApiClient.post(`${domain}/oauth/logout`);

const postLogoutWithCookie = (domain: Domain) =>
  ApiClientWithCookie.post(`${domain}/oauth/cookie/logout`);

export const usePostLogoutApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogout(domain),
    onError: () => {
      toast({
        variant: 'default',
        title: 'refresh-token이 없거나 만료되어 로그아웃 처리됩니다.',
      });
    },
    onSettled: () => {
      setAccessToken('');
    },
  });

  return mutateAsync;
};

export const usePostLogoutWithAuthorizationApi = () => {
  return () => {
    localStorage.removeItem('refreshToken-storage');
    setAccessToken('');
  };
};

export const usePostLogoutWithCookieApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogoutWithCookie(domain),
    onError: () => {
      toast({
        variant: 'default',
        title: 'refresh-token이 없거나 만료되어 로그아웃 처리됩니다.',
      });
    },
  });

  return mutateAsync;
};
