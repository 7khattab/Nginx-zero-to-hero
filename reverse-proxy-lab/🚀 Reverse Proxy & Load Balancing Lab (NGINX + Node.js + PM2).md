Here is a **clean, professional DevOps portfolio–ready README** that merges everything you built into a structured, recruiter-friendly format (you can copy/paste مباشرة into GitHub).

---

# 🚀 Reverse Proxy & Load Balancing Lab (NGINX + Node.js + PM2)

## 📌 Overview

This project demonstrates a production-like **reverse proxy and load balancing architecture** using industry-standard DevOps tools.

It starts from a simple reverse proxy setup and evolves into a **multi-backend load-balanced system with SSL termination**.

---

## 🧱 Architecture Evolution

### 🔹 Stage 1: Basic Reverse Proxy

```text
Client → NGINX → Node.js (Single Backend)
```

### 🔹 Stage 2: Load Balanced System (Final)

```text
Client
   ↓
NGINX (Reverse Proxy + Load Balancer)
   ↓
---------------------------------
| backend1 | backend2 | backend3 |
| :3001    | :3002    | :3003    |
---------------------------------
```

---

## ⚙️ Tech Stack

* NGINX — Reverse Proxy & Load Balancer
* Node.js — Backend services
* PM2 — Process management
* Fedora Linux — Server environment

---

## 🧩 Backend Services

Three independent Node.js servers:

| Service  | Port | Response               |
| -------- | ---- | ---------------------- |
| backend1 | 3001 | Response From BACKEND1 |
| backend2 | 3002 | Response From BACKEND2 |
| backend3 | 3003 | Response From BACKEND3 |

Each backend is bound to localhost only:

```js
server.listen(PORT, "127.0.0.1");
```

✔ Ensures backend isolation and security.

---

## 🧠 Process Management (PM2)

PM2 is used to keep backend services running in production mode.

### Start services:

```bash
pm2 start backend1/server.js --name backend1
pm2 start backend2/server.js --name backend2
pm2 start backend3/server.js --name backend3
```

### Monitor processes:

```bash
pm2 list
pm2 logs
pm2 restart all
```

---

## 🌐 NGINX Configuration

### 📌 Load Balancer (Upstream Block)

```nginx
upstream backend_servers {
    server 127.0.0.1:3001 weight=3;
    server 127.0.0.1:3002 weight=2;
    server 127.0.0.1:3003 weight=1;
}
```

---

### 📌 HTTP → HTTPS Redirect

```nginx
server {
    listen 80;
    server_name nodeJS_APP.com;
    return 301 https://$host$request_uri;
}
```

---

### 📌 HTTPS Reverse Proxy + Load Balancer

```nginx
server {
    listen 443 ssl;
    server_name nodeJS_APP.com;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;

    location / {
        proxy_pass http://backend_servers;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## ⚖️ Load Balancing Strategy

This setup uses **Weighted Round Robin**:

| Backend  | Weight | Traffic Share |
| -------- | ------ | ------------- |
| backend1 | 3      | High          |
| backend2 | 2      | Medium        |
| backend3 | 1      | Low           |

✔ Ensures controlled traffic distribution across services.

---

## 🧪 Testing & Verification

### Load Balancing Test

```bash
for i in {1..10}; do curl -k https://nodeJS_APP.com; done
```

### Sample Output

```text
Response From BACKEND1
Response From BACKEND2
Response From BACKEND1
Response From BACKEND3
Response From BACKEND2
Response From BACKEND1
```

✔ Confirms:

* Load balancing is working correctly
* Weighted distribution is applied
* NGINX routing is stable

---

## 🔐 Security Layer

* HTTPS enabled via SSL certificates
* HTTP automatically redirects to HTTPS
* Backend servers are not publicly exposed (localhost only)
* Secure headers forwarded via NGINX

---

## 📊 Key DevOps Concepts Demonstrated

* Reverse Proxy architecture
* Load balancing (weighted round-robin)
* Process management with PM2
* SSL termination at NGINX
* Backend isolation (127.0.0.1 binding)
* Production-like traffic simulation

---

## 📈 Project Progression

### Stage 1

```text
NGINX → Single Node.js backend
```

### Stage 2 (Final)

```text
NGINX → Load Balancer → Multiple Node.js backends
```

---

## 🚀 Future Improvements

* Sticky sessions (session persistence)
* Health checks + auto failover
* Docker Compose clusterization
* Kubernetes migration (Ingress controller)
* Let's Encrypt SSL (production certificates)
* Auto-scaling simulation

---

## 📂 Useful Commands

```bash
pm2 list
pm2 logs
sudo nginx -t
sudo systemctl reload nginx
curl -k https://nodeJS_APP.com
```

---

## 🎯 Summary

This project simulates a real-world production architecture:

* Multiple backend services
* NGINX reverse proxy & load balancing
* Weighted traffic distribution
* Secure HTTPS layer
* Process supervision using PM2


