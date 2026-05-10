# 🚀 Reverse Proxy Lab using NGINX and Node.js on Fedora

## 📌 Overview

In this lab we will build a simple Reverse Proxy architecture using:

* NGINX
* Node.js
* PM2
* Fedora Linux

### Final Architecture

```text
Client ---> NGINX ---> Node.js Backend
```

* NGINX listens on Port 80
* Node.js application listens on Port 3000
* Users access NGINX only
* NGINX forwards requests to the backend application

This setup is called:

# 🔥 Reverse Proxy

---

# 📌 Prerequisites

## Recommended Environment

* Fedora Linux
* Virtual Machine
* VPS
* VirtualBox
* VMware

---

# 📌 Update System

```bash
sudo dnf update -y
```

---

# 📌 Install Node.js and npm

```bash
sudo dnf install nodejs npm -y
```

## Verify Installation

```bash
node -v
npm -v
```

---

# 📌 Install NGINX

```bash
sudo dnf install nginx -y
```

## Enable and Start NGINX

```bash
sudo systemctl enable --now nginx
```

## Verify Status

```bash
systemctl status nginx
```

---

# 📌 Configure Firewall

Fedora uses firewalld by default.

Allow HTTP traffic:

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload
```

---

# 📌 Create Project Directory

```bash
mkdir reverse-proxy-lab
cd reverse-proxy-lab
```

---

# 📌 Create Backend Application

Create file:

```bash
nano app.js
```

## app.js

```javascript
const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Host:", req.headers.host);
    console.log("Client IP:", req.headers["x-forwarded-for"]);

    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Reverse Proxy Working\n");

});

server.listen(3000, "127.0.0.1", () => {
    console.log("Server running on port 3000");
});
```

---

# 📌 Why Bind to 127.0.0.1 ?

```javascript
server.listen(3000, "127.0.0.1")
```

This means:

* Backend accepts local connections only
* External users cannot access Port 3000 directly
* Improves security

---

# 📌 Install PM2

PM2 keeps Node.js applications running in the background.

Install globally:

```bash
sudo npm install -g pm2
```

---

# 📌 Start Application using PM2

```bash
pm2 start app.js
```

## Show Running Applications

```bash
pm2 list
```

## View Logs

```bash
pm2 logs
```

---

# 📌 Enable PM2 Startup Service

Generate startup script:

```bash
pm2 startup
```

Run the generated command.

Then save the process list:

```bash
pm2 save
```

---

# 📌 Configure NGINX Reverse Proxy

Edit NGINX configuration:

```bash
sudo nano /etc/nginx/nginx.conf
```

## Add Reverse Proxy Configuration

```nginx
server {

    listen 80;

    server_name _;

    location / {

        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 5s;
        proxy_read_timeout 30s;

    }
}
```

---

# 📌 Important Headers

## X-Real-IP

```nginx
proxy_set_header X-Real-IP $remote_addr;
```

Sends the real client IP to the backend.

---

## X-Forwarded-For

```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

Used for:

* Logging
* Security
* Rate Limiting
* Load Balancers
* Cloudflare

---

## X-Forwarded-Proto

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
```

Tells the backend whether the request uses:

* HTTP
* HTTPS

---

# 📌 Test NGINX Configuration

```bash
sudo nginx -t
```

Expected output:

```text
syntax is ok
test is successful
```

---

# 📌 Reload NGINX

Reload without downtime:

```bash
sudo systemctl reload nginx
```

---

# 📌 Check Open Ports

```bash
sudo ss -tulpn
```

Expected:

```text
80    nginx
3000 node
```

---

# 📌 Get Server IP Address

```bash
hostname -I
```

or

```bash
ip a
```

---

# 📌 Test Reverse Proxy

This should work:

```bash
curl http://SERVER_IP
```

Expected output:

```text
Reverse Proxy Working
```

---

# 📌 Monitor Logs

## Access Logs

```bash
sudo tail -f /var/log/nginx/access.log
```

## Error Logs

```bash
sudo tail -f /var/log/nginx/error.log
```

---

# 📌 Common Errors

## 502 Bad Gateway

Usually means:

* Backend application is down
* Wrong port
* PM2 stopped
* Node.js crashed

Check:

```bash
pm2 list
```

---

## 504 Gateway Timeout

Usually means:

* Backend application is too slow
* Backend did not respond before timeout

---

# 📌 Final Architecture

```text
Internet
    ↓
NGINX :80
    ↓
Node.js :3000
(localhost only)
```

---

# 📌 Next Steps

After completing this lab, you can continue with:

* HTTPS using Certbot
* Docker
* Kubernetes Ingress
* Load Balancing
* Rate Limiting
* NGINX Caching
* Multiple Backend Servers

---

