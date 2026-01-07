# Calendar App – AWS EC2 Deployment

This folder serves as:
- a personal deployment reference
- documentation of AWS EC2 deployment knowledge

This project demonstrates a full-stack deployment on AWS EC2 using:

- Ubuntu Server
- Nginx (reverse proxy + HTTPS)
- Spring Boot (backend)
- Next.js (frontend)
- MySQL
- systemd services
- Bash automation

## Architecture

Browser  
→ Nginx (443 / HTTPS)  
→ Frontend (Next.js on port 3000)  
→ Backend (Spring Boot on port 9090)  
→ MySQL (3306)

## Files in this folder

### 01_deploy_ec2.sh
Initial server setup:
- system update
- install nginx, MySQL, Java, git
- clone repository
- build backend & frontend

> This script is **not fully automatic** by design.
> It documents the base installation steps.

Run on a fresh EC2 instance:
```bash
bash deploy/01_deploy_ec2.sh
```

### 02_nginx_conf.example

Manual steps:
```bash 
sudo nano /etc/nginx/sites-available/calendar-app
``` 
Paste the contents of 02_nginx_conf.example
```bash 
sudo ln -s /etc/nginx/sites-available/calendar-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 03_calendar_backend.service.example
Create the service file:
```bash 
sudo nano /etc/systemd/system/calendar-backend.service
``` 
Paste the contents of 03_calendar_backend.service.example, then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable calendar-backend
sudo systemctl start calendar-backend
```
### 04_calendar_frontend.service.example
Create the service file:
```bash 
sudo nano /etc/systemd/system/calendar-frontend.service
```
Paste the contents of 04_calendar_frontend.service.example, then:
```bash 
sudo systemctl daemon-reload
sudo systemctl enable calendar-frontend
sudo systemctl start calendar-frontend
```

### HTTPS (Let's Encrypt): 
```bash 
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d mycalendarapp.eu -d www.mycalendarapp.eu
