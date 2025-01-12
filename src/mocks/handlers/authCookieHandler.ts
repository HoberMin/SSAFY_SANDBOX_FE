import { HttpResponse, http } from 'msw';

const userInfo = {
  nickname: null as string | null,
};

const tokens = {
  accessToken: '',
  refreshToken: '',
};

export const authCookieHandler = [
  http.post('/oauth/cookie/auth', async ({ request }) => {
    const { code } = (await request.json()) as { code: string };

    if (typeof code === 'string') {
      tokens.accessToken = 'abcd-cookie';
      tokens.refreshToken = 'abc-12323-cookie';
      userInfo.nickname = '하은-cookie';

      const headers = new Headers();

      headers.append(
        'Set-Cookie',
        `refreshToken=${tokens.refreshToken}; HttpOnly`,
      );
      headers.append(
        'Set-Cookie',
        `accessToken=${tokens.accessToken}; HttpOnly`,
      );

      //   for (const [key, value] of headers.entries()) {
      //     console.log(`${key}: ${value}`);
      //   }
      return HttpResponse.json({
        status: 201,
        headers,
      });
    }

    return HttpResponse.json({ message: '에러입니다.' }, { status: 400 });
  }),

  http.get('/oauth/cookie/member', () => {
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

  http.post('/oauth/cookie/logout', ({ cookies }) => {
    if (!cookies.refreshToken) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    tokens.accessToken = '';
    tokens.refreshToken = '';
    userInfo.nickname = null;

    const headers = new Headers();
    headers.append('Set-Cookie', 'accessToken=; Path=/; HttpOnly; Max-Age=0');
    headers.append('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; Max-Age=0');

    return HttpResponse.json({
      status: 200,
      headers,
    });
  }),

  http.get('/oauth/cookie/reissue', ({ cookies }) => {
    console.log(cookies);
    if (!cookies.refreshToken || cookies.refreshToken !== tokens.refreshToken) {
      return HttpResponse.json(
        {
          code: 'ERR_MISSING_ACCESS_TOKEN',
          message: '토큰이 유효하지 않습니다.',
        },
        { status: 401 },
      );
    }

    tokens.accessToken = 'new-abcd-cookie';

    const headers = new Headers();
    headers.append(
      'Set-Cookie',
      `accessToken=${tokens.accessToken}; Path=/; HttpOnly`,
    );
    headers.append(
      'Set-Cookie',
      `refreshToken=${tokens.refreshToken}; HttpOnly`,
    );

    return HttpResponse.json(
      { accessToken: tokens.accessToken },
      { status: 200 },
    );
  }),
];
