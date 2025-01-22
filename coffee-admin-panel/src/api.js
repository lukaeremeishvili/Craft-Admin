const API_URL = "https://crudapi.co.uk/api/v1";
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

export const fetchIngredients = async () => {
  const response = await fetch(`${API_URL}/ingredients`, { headers });
  const data = await response.json();
  return data.items ? data.items : [];
};

export const fetchCoffee = async () => {
  const response = await fetch(`${API_URL}/coffee`, { headers });
  const data = await response.json();
  return data.items ? data.items : [];
};

export const addIngredient = async (ingredient) => {
  const response = await fetch(`${API_URL}/ingredients`, {
    method: "POST",
    headers,
    body: JSON.stringify([ingredient]), 
  });
  const data = await response.json();
  return data.items[0];
};

export const addCoffee = async (coffee) => {
  const response = await fetch(`${API_URL}/coffee`, {
    method: "POST",
    headers,
    body: JSON.stringify([coffee]), 
  });
  const data = await response.json();
  return data.items[0]; 
};

export const updateIngredient = async (id, ingredient) => {
  const response = await fetch(`${API_URL}/ingredients/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(ingredient),
  });
  return response.json();
};

export const updateCoffee = async (id, coffee) => {
  const response = await fetch(`${API_URL}/coffee/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(coffee),
  });
  return response.json();
};

export const deleteIngredient = async (id) => {
  const response = await fetch(`${API_URL}/ingredients/${id}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};

export const deleteCoffee = async (id) => {
  const response = await fetch(`${API_URL}/coffee/${id}`, {
    method: "DELETE",
    headers,
  });
  return response.json();
};
