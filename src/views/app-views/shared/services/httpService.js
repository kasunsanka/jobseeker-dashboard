import Axios from 'axios';

// default settings
Axios.defaults.headers.get['Content-Type'] = 'application/json';

/**
 *
 * @param url: api url
 * @param method: GET | POST | PUT |PATCH | DELETE
 * @param headers: custom header
 * @param requestCancelToken: token for cancel request
 * @returns
 */
export const fetch = ({
  url,
  data = null,
  params = null,
  method = 'GET',
  headers = null,
  requestCancelToken = null,
}) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (requestCancelToken) {
    config.cancelToken = requestCancelToken;
  }

  if (params) {
    config = { ...config, params };
  }

  if (headers) {
    config = { ...config, headers };
  }

  switch (method) {
    case 'GET':
      return Axios.get(url, data, config);
    case 'POST':
      return Axios.post(url, data, config);
    case 'PUT':
      return Axios.put(url, data, config);
    case 'PATCH':
      return Axios.patch(url, data, config);
    case 'DELETE':
      return Axios.delete(url, data, config);
    default:
      throw Error('Invalid http method');
  }
};
