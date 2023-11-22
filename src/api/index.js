const BASE_URL = "https://escribo-api-82f3e4f3b959.herokuapp.com/";

export const createUser = async (user) => {
    const response = await fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export const logUser = async (user) => {
    const response = await fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export const getUserInfo = async (token) => {
  const response = await fetch(`${BASE_URL}getuser`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    const data = await response.json();
    return data;
};
