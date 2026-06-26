import API from "../api/axios";
import { cache } from "./cache";

/*
|--------------------------------------------------------------------------
| Cached GET request
|--------------------------------------------------------------------------
*/

export const cachedGet = async (key, url, setState) => {
  // 1️⃣ Load cached instantly
  const cached = cache.get(key);
  if (cached) {
    setState(cached);
  }

  // 2️⃣ Fetch fresh data in background
  try {
    const res = await API.get(url);
    cache.set(key, res.data);
    setState(res.data);
  } catch (err) {
    console.error("API error:", err);
  }
};
