const blacklistedTokens = new Set();

const addToBlacklist = (token, expirationTime = null) => {
  blacklistedTokens.add(token);
  if (expirationTime) {
    setTimeout(() => {
      blacklistedTokens.delete(token);
    }, expirationTime - Date.now());
  }
};

const isBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

const removeFromBlacklist = (token) => {
  return blacklistedTokens.delete(token);
};

const clearBlacklist = () => {
  blacklistedTokens.clear();
};

module.exports = {
  addToBlacklist,
  isBlacklisted,
  removeFromBlacklist,
  clearBlacklist
};