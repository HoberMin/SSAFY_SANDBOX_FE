import { HttpResponse, http } from 'msw';

import { setAccessToken } from '@/apis/authentication';

const userInfo = {
  nickname: null as string | null,
};

const tokens = {
  accessToken: '',
  refreshToken: '',
};

export const authHeaderHandler = [
  http.post('/oauth/authorization/auth', async ({ request }) => {
    const { code } = (await request.json()) as { code: string };

    if (typeof code === 'string') {
      tokens.accessToken = 'abcd-header';
      tokens.refreshToken = 'abc-12323-header';
      userInfo.nickname = '하은-header';

      return HttpResponse.json(
        { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken },
        {
          status: 201,
        },
      );
    }

    return HttpResponse.json({ message: '에러입니다.' }, { status: 400 });
  }),

  http.get('/oauth/authorization/member', () => {
    return HttpResponse.json(
      { nickname: userInfo.nickname },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),

  http.post('/oauth/authorization/logout', () => {
    const refreshToken = localStorage.getItem('refreshToken-storage');
    if (!refreshToken) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    tokens.accessToken = '';
    tokens.refreshToken = '';
    userInfo.nickname = null;

    localStorage.removeItem('refreshToken-storage');
    setAccessToken('');

    return HttpResponse.json({
      status: 200,
    });
  }),

  http.get('/oauth/authorization/reissue', () => {
    const refreshToken = localStorage.getItem('refreshToken-storage');

    if (!refreshToken || refreshToken !== tokens.refreshToken) {
      return HttpResponse.json(
        {
          code: 'ERR_MISSING_ACCESS_TOKEN',
          message: '토큰이 유효하지 않습니다.',
        },
        { status: 401 },
      );
    }

    tokens.accessToken = 'new-abcd';
    setAccessToken('new-abcd-header');

    return HttpResponse.json(
      { accessToken: tokens.accessToken },
      { status: 200 },
    );
  }),
];
