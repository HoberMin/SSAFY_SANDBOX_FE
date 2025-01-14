import { HttpResponse, http } from 'msw';

const userInfo = {
  nickname: null as string | null,
};

const tokens = {
  accessToken: '',
  refreshToken: '',
};

export const authHandler = [
  http.post('/oauth/auth', async ({ request }) => {
    const { code } = (await request.json()) as { code: string };

    if (typeof code === 'string') {
      tokens.accessToken = 'abcd';
      tokens.refreshToken = 'abc-12323';
      userInfo.nickname = '하은';

      return HttpResponse.json(
        { accessToken: tokens.accessToken },
        {
          status: 201,
          headers: {
            'Set-Cookie': `refreshToken=${tokens.refreshToken}; HttpOnly`,
          },
        },
      );
    }

    return HttpResponse.json({ message: '에러입니다.' }, { status: 400 });
  }),

  http.get('/oauth/member', () => {
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

  http.post('/oauth/logout', ({ cookies }) => {
    if (!cookies.refreshToken) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    tokens.accessToken = '';
    tokens.refreshToken = '';
    userInfo.nickname = null;

    return HttpResponse.json({
      status: 200,
      headers: {
        'Set-Cookie': 'refreshToken=; HttpOnly; Max-Age=0',
      },
    });
  }),

  http.get('/oauth/reissue', ({ cookies }) => {
    if (!cookies.refreshToken || cookies.refreshToken !== tokens.refreshToken) {
      return HttpResponse.json(
        {
          code: 'ERR_MISSING_ACCESS_TOKEN',
          message: '토큰이 유효하지 않습니다.',
        },
        { status: 401 },
      );
    }

    tokens.accessToken = 'new-abcd';

    return HttpResponse.json(
      { accessToken: tokens.accessToken },
      { status: 200 },
    );
  }),
];
