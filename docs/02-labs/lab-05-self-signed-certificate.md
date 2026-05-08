# Nginx HTTPS Setup with Self-Signed SSL Certificate

This lab demonstrates how to configure HTTPS on Nginx using a self-signed SSL certificate generated with OpenSSL.

---

# 📚 What You Will Learn

* SSL/TLS basics
* HTTPS configuration in Nginx
* Creating self-signed certificates
* Public Key vs Private Key
* TLS Handshake basics
* Redirecting HTTP to HTTPS

---

# 🛠️ Prerequisites

* Linux Server (Ubuntu/Debian)
* Nginx installed
* OpenSSL installed
* Root or sudo privileges

---

# Step 1 — Install OpenSSL

Check if OpenSSL is already installed:

```bash
openssl version
```

If not installed:

## Ubuntu/Debian

```bash
sudo apt update
sudo apt install openssl -y
```

---

# Step 2 — Create SSL Directory

Create a directory for SSL certificates:

```bash
sudo mkdir -p /etc/nginx/ssl
cd /etc/nginx/ssl
```

---

# Step 3 — Generate a Self-Signed Certificate

Run the following command:

```bash
sudo openssl req -x509 -nodes -days 365 \
-newkey rsa:2048 \
-keyout private.key \
-out certificate.crt
```

---

# 🔍 Command Explanation

| Option             | Description                         |
| ------------------ | ----------------------------------- |
| `req`              | Create certificate request          |
| `-x509`            | Generate self-signed certificate    |
| `-nodes`           | Create private key without password |
| `-days 365`        | Certificate valid for 1 year        |
| `-newkey rsa:2048` | Generate new 2048-bit RSA key       |
| `-keyout`          | Output private key file             |
| `-out`             | Output certificate file             |

---

# During Certificate Creation

You will be asked for information such as:

* Country Name
* Organization Name
* Common Name

## Important

For local testing:

```text
localhost
```

For a real server:

```text
your-domain.com
```

---

# Generated Files

Two files will be created:

```text
private.key
certificate.crt
```

## Difference Between Them

### `private.key`

* Contains the private secret key
* Must never be shared

### `certificate.crt`

* Public certificate
* Sent to browsers during HTTPS connection

---

# Step 4 — Configure Nginx for HTTPS

Open the default Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/default
```

Add the following configuration:

```nginx
server {
    listen 443 ssl;

    server_name localhost;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

---

# 🔍 Configuration Explanation

| Directive             | Description              |
| --------------------- | ------------------------ |
| `listen 443 ssl`      | Listen for HTTPS traffic |
| `ssl_certificate`     | Path to SSL certificate  |
| `ssl_certificate_key` | Path to private key      |

---

# Important Ports

| Protocol | Port |
| -------- | ---- |
| HTTP     | 80   |
| HTTPS    | 443  |

---

# Step 5 — Test Nginx Configuration

Run:

```bash
sudo nginx -t
```

Expected output:

```text
syntax is ok
test is successful
```

---

# Step 6 — Restart Nginx

```bash
sudo systemctl restart nginx
```

---

# Step 7 — Open the Website

Visit:

```text
https://localhost
```

Or use your server IP address.

---

# ⚠️ Browser Warning

You will likely see:

```text
Your connection is not private
```

This is expected because the certificate is:

```text
Self-Signed
```

The browser does not trust it automatically.

---

# Important Concept

## ✅ Encryption Exists

Traffic is encrypted.

## ❌ Trust Does Not Exist

The certificate is not issued by a trusted Certificate Authority (CA).

---

# Step 8 — Redirect HTTP to HTTPS

To automatically redirect all HTTP traffic to HTTPS:

```nginx
server {
    listen 80;
    server_name localhost;

    return 301 https://$host$request_uri;
}
```

---

# What is 301 Redirect?

```text
Permanent Redirect
```

It tells browsers to always use HTTPS instead of HTTP.

---

# Final Nginx Configuration

```nginx
server {
    listen 80;
    server_name localhost;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;

    server_name localhost;

    ssl_certificate /etc/nginx/ssl/certificate.crt;
    ssl_certificate_key /etc/nginx/ssl/private.key;

    location / {
        root /var/www/html;
        index index.html;
    }
}
```

Then apply changes:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

# 🔐 HTTPS Flow Overview

```text
Browser
   ↓ HTTPS Request
Nginx
   ↓ Sends Certificate
Browser checks certificate
TLS Handshake starts
Encrypted connection established
```

---

# Key Concepts Learned

* SSL/TLS
* HTTPS
* Certificates
* Public & Private Keys
* Nginx SSL Configuration
* TLS Handshake
* HTTP → HTTPS Redirection

---

# 📖 References

* [OpenSSL Documentation](https://www.openssl.org/docs/?utm_source=chatgpt.com)
* [Nginx SSL Configuration Guide](https://nginx.org/en/docs/http/configuring_https_servers.html?utm_source=chatgpt.com)
* [Mozilla TLS Best Practices](https://wiki.mozilla.org/Security/Server_Side_TLS?utm_source=chatgpt.com)

