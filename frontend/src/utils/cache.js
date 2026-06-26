/*
|--------------------------------------------------------------------------
| SIMPLE LOCAL CACHE LAYER
|--------------------------------------------------------------------------
*/

const CACHE_PREFIX = "delivery_app_";
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export const cache = {
  set(key, data) {
    const payload = {
      data,
      expiry: Date.now() + CACHE_TTL,
    };

    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify(payload)
    );
  },

  get(key) {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const payload = JSON.parse(raw);

    if (Date.now() > payload.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return payload.data;
  },

  remove(key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  },
};