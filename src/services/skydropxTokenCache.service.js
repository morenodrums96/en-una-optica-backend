// src/services/skydropxTokenCache.js
let cachedToken = null;
let tokenExpiration = null;

export const getCachedToken = async (getTokenFn) => {
  const now = Date.now();

  if (cachedToken && tokenExpiration && now < tokenExpiration) {
    return cachedToken;
  }

  const token = await getTokenFn();
  cachedToken = token;
  tokenExpiration = now + (2 * 60 * 60 * 1000); // 2 horas en ms

  return token;
};
