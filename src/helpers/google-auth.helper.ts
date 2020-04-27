import axios from 'axios';

export async function getAccessTokenFromCode(code: string) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: "561476717721-b1sfrvmtl9gp8rml8dpa3kfm1tsi8qk2.apps.googleusercontent.com",
      client_secret: "9N6iURlXitHJYgoB-EoD2lsT",
      redirect_uri: 'http://localhost:3000',
      grant_type: 'authorization_code',
      code,
    },
  });

  return data.access_token;
}

export async function getUserProfile(accessToken: string) {
  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};
