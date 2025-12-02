# Files That Need apiClient Import

## Files using direct fetch() to /api endpoints:

1. client/src/pages/Auth/ProfileSetup.jsx - Line 43
2. client/src/pages/Auth/CompleteProfile.jsx - Lines 23, 55, 74
3. client/src/pages/Auth/ResetPassword.jsx - Line 51
4. client/src/pages/Auth/ForgotPassword.jsx - Line 27
5. client/src/pages/Settings/Settings.jsx - Lines 66, 106, 164
6. client/src/pages/Landing/NavbarLanding.jsx - Lines 29, 47
7. client/src/pages/Auth/Signup.jsx - Lines 48, 80, 126
8. client/src/pages/Auth/Login.jsx - Line 57 (Google OAuth redirect)
9. client/src/pages/Auth/Signup.jsx - Line 164 (Google OAuth redirect)

## Action Required:

Replace ALL `fetch('/api/...)` with `apiClient('/api/...)`

For Google OAuth:
Replace `window.location.href = '/api/auth/google'`
With `window.location.href = '${import.meta.env.VITE_API_URL || 'https://cgpa-analyzer.onrender.com'}/api/auth/google'`

## Status:

- AuthContext.jsx - ✅ FIXED
- Login.jsx - PARTIAL (Google OAuth needs fixing)
- Need to fix: 8 more files
