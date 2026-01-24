# Token Revocation and Expiration

Explaining the current limitations and behavior regarding token revocation.

## 1. Do Tokens Get Revoked?
**No.** In the current implementation (Standard JWT), tokens **cannot be remotely revoked**.
Once the server issues a token (like printing a movie ticket), that token is valid until its expiration date. The server does not keep a "black list" of cancelled tickets.

If you block a user in the database, they can still use their existing token until it expires (usually 1 hour or 7 days, depending on config). After that, when they try to refresh or login again, the server will reject them.

## 2. What Happens in the Frontend?
Your frontend checks for expiration, but not revocation.

**Code in `AuthContext.jsx`:**
```javascript
if (decoded.exp && decoded.exp < now) {
  localStorage.removeItem('token');
  setUser(null);
}
```
This means:
1.  **Expiration:** If the expiration date passed, the app automatically logs you out.
2.  **Invalid Token:** If the token signature is wrong (hacked), `jwt-decode` might fail or the first API call will return `401 Unauthorized`.

## 3. How to Handle "Ban Hammer" (Immediate Revocation)?
To implement "Kick user out NOW", you need either:
-   **Database Check:** On every API request, after checking the token signature, check the DB to see if `user.isBanned === true`. (Slower but safer).
-   **Blacklist:** Store revoked token IDs in Redis (fast cache) for their remaining lifetime.
