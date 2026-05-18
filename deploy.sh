#!/bin/bash
# Seek The Waters Festival 2026 - Automated Deployment Script
# This script provisions the repository and prepares it for GitHub Pages deployment.

set -e

echo "Initializing local repository..."
git init
git checkout -b main

echo "Staging all assets..."
git add .

echo "Committing production build..."
git commit -m "Deploy production build for Seek The Waters Festival 2026"

echo ""
echo "============================================"
echo "  READY FOR DEPLOYMENT"
echo "============================================"
echo ""
echo "Run these commands to link your GitHub repository and go live:"
echo ""
echo "  git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git"
echo "  git push -u origin main --force"
echo ""
echo "Then enable GitHub Pages in your repo settings:"
echo "  Settings > Pages > Source: Deploy from branch > main > /root"
echo ""

