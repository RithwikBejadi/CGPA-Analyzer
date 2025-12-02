#!/bin/bash

# Script to add apiClient import and replace fetch calls

files=(
  "client/src/pages/Auth/ForgotPassword.jsx"
  "client/src/pages/Auth/ResetPassword.jsx"
  "client/src/pages/Auth/ProfileSetup.jsx"
  "client/src/pages/Auth/CompleteProfile.jsx"
  "client/src/pages/Landing/NavbarLanding.jsx"
)

for file in "${files[@]}"; do
  echo "Processing $file..."
  
  #Add apiClient import if not present
  if ! grep -q "import apiClient" "$file"; then
    # Add import after the last import statement
    sed -i'' -e '/^import/a\
import apiClient from '"'"'../../services/apiClient'"'"';
' "$file"
  fi
  
  # Replace fetch calls
  sed -i'' -e "s/fetch('/apiClient('/g" "$file"
  
  echo "✓ Fixed $file"
done

echo "All files processed!"
