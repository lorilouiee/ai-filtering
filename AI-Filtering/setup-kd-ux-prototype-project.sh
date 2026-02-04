#!/usr/bin/env bash
set -euo pipefail

# -----------------------------------------------------------------------------
# Koddi UX Prototyping Template bootstrap (curl | bash safe)
# - Ensures ~/.npmrc has GitHub Packages auth (only prompts if needed)
# - Prompts for desired project name
# - Clones https://github.com/KoddiDev/koddi-ux-prototyping-template into that name
# - Updates package.json "name" to the new project name if package.json exists
# -----------------------------------------------------------------------------

REPO_URL="https://github.com/KoddiDev/koddi-ux-prototyping-template.git"
AUTH_KEY="//npm.pkg.github.com/:_authToken"
NPMRC="$HOME/.npmrc"

needs_setup=false

# ---------- Check ~/.npmrc ----------
if [[ ! -f "$NPMRC" ]]; then
  needs_setup=true
elif ! grep -qE "^[[:space:]]*${AUTH_KEY}=" "$NPMRC"; then
  needs_setup=true
fi

if [[ "$needs_setup" == true ]]; then
  cat <<'INSTR'

============================================================
 npm setup required for GitHub Packages (only shown when needed)
============================================================

This setup is required to install private @koddidev npm packages.

STEP 1 — Create a GitHub Personal Access Token (classic)
  1) Open: https://github.com/settings/tokens
  2) Click: Generate new token → Generate new token (classic)
  3) Configure:
       - Name: Koddi npm packages
       - Expiration: Never Expire
       - Scopes: check "read:packages"
  4) Click "Generate token"
  5) COPY the token immediately — you will only see it once.

Press ENTER once you have copied the token to your clipboard.

INSTR

  # wait for user
  read -r -p ""

  echo ""
  echo "Configuring ~/.npmrc..."
  if [[ ! -f "$NPMRC" ]]; then
    touch "$NPMRC"
    chmod 600 "$NPMRC" || true
    echo "Created: $NPMRC"
  else
    echo "Found existing: $NPMRC"
  fi

  # Prompt for token (hidden)
  printf "\nPaste your GitHub token (input hidden): "
  read -r -s GITHUB_TOKEN
  echo ""
  if [[ -z "${GITHUB_TOKEN}" ]]; then
    echo "❌ No token entered. Aborting."
    exit 1
  fi

  # Append token line, but avoid duplicating
  if grep -qE "^[[:space:]]*${AUTH_KEY}=" "$NPMRC"; then
    echo "Note: ~/.npmrc already contains a GitHub Packages auth line. Leaving it as-is."
  else
    echo "${AUTH_KEY}=${GITHUB_TOKEN}" >> "$NPMRC"
    echo "✔ Added GitHub Packages token to ~/.npmrc"
  fi
else
  echo "✔ GitHub Packages npm authentication already configured in ~/.npmrc"
fi