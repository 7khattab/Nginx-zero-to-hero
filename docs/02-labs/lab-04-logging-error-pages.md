# 🧪 Lab 04 – Logging & Error Pages

## 🎯 Objective

* Configure custom error pages
* Configure access logs
* Configure error logs
* Understand Nginx logging basics

---

# 🏗️ Architecture

```id="x30s0l"
Client Browser
       │
       ▼
    Nginx
       │
       ▼
  Access Logs
  Error Logs
```

---

# 📄 Step 1 – Create Custom Error Page

```bash id="jw0u5m"
vim /var/www/site-1.com/404.html
```

---

## 🧾 HTML Content

```html id="lt4wsr"
<h1>404 Not Found</h1>
<p>The page does not exist</p>
```

---

# ⚙️ Step 2 – Configure Error Page

```bash id="o9knm9"
vim /etc/nginx/conf.d/site-1.com.conf
```

---

## 🔧 Nginx Configuration

```nginx id="w8zt3r"
server {
    listen 80;
    server_name site-1.com;

    root /var/www/site-1.com;
    index index.html;

    error_page 404 /404.html;

    location = /404.html {
        root /var/www/site-1.com;
    }
}
```

---

# 📊 Step 3 – Configure Access & Error Logs

## 🔧 Configuration

```nginx id="ewenpb"
access_log /var/log/nginx/site1_access.log;
error_log /var/log/nginx/site1_error.log;
```

---

# 🧠 Understanding Logs

## 📘 Access Log

Records all successful client requests.

Example:

```id="t1rkwm"
192.168.1.10 - - [07/May/2026:12:00:00] "GET / HTTP/1.1" 200
```

---

## 📕 Error Log

Records server-side errors and issues.

Example:

```id="x86o15"
2026/05/07 12:00:00 [error] file not found
```

---

# 🔍 Step 4 – Monitor Logs in Real Time

## 📘 Access Logs

```bash id="pbjlwm"
sudo tail -f /var/log/nginx/site1_access.log
```

---

## 📕 Error Logs

```bash id="s2iqph"
sudo tail -f /var/log/nginx/site1_error.log
```

---

# 🧪 Step 5 – Test Configuration

```bash id="bxrm36"
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🌐 Browser Testing

Valid page:

```id="5pjzvp"
http://site-1.com
```

Invalid page:

```id="j5e6x0"
http://site-1.com/test
```

---

# ⚠️ Security Tip

In production environments, logs are important for:

* Troubleshooting
* Security monitoring
* Performance analysis

---

# 🧠 What I Learned

* How custom error pages work
* Difference between access logs and error logs
* How to monitor Nginx logs
* Basic troubleshooting using logs

