#!/usr/bin/env bash
set -e

echo "=== Calendar App AWS EC2 deployment ==="

# System update
sudo apt update && sudo apt upgrade -y

# Install base dependencies
sudo apt install -y \
  nginx \
  mysql-server \
  openjdk-23-jdk \
  curl \
  git

# Enable services on boot
sudo systemctl enable nginx
sudo systemctl enable mysql

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Clone project
mkdir -p ~/app
cd ~/app
git clone https://github.com/YOUR_USERNAME/calendar-app.git
cd calendar-app

# Backend build
cd backend
./mvnw clean package -DskipTests
cd ..

# Frontend build
cd frontend
npm install
npm run build
cd ..

echo "========================================"
echo "Manual steps:"
echo "- Configure MySQL user & database"
echo "- Configure systemd services"
echo "- Configure nginx"
echo "- Setup HTTPS with certbot"
echo "========================================"
