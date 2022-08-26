const baseUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export async function apiGetIngredients() {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
}

export async function apiPostOrder(order) {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  })
    .then(checkResponse)
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data)
    });
}
