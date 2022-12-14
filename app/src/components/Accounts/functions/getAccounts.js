export const getAccounts = (userAccountId, token) => {
  if (!token) {
    return Promise.reject({
      errorMessage: "Missing token",
    });
  }
  if (!userAccountId) {
    return Promise.reject({
      errorMessage: "Missing userAccountId",
    });
  }
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  return fetch(endpoint + "banking-accounts/?userAccountId=" + userAccountId, {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((data) => data.json());
};
