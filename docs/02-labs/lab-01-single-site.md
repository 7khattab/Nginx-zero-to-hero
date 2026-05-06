# 🧪 Lab 01 – Single Site Configuration

## 🎯 Objective

* Install and run Nginx
* Serve a static website
* Configure a server block
* Create a custom 404 error page

---

## ⚙️ Step 1 – Install Nginx

```bash
sudo dnf install nginx -y
sudo systemctl enable --now nginx
```

---

## 📁 Step 2 – Create Website

```bash
mkdir -p /var/www/site-1.com
```

```bash
vim /var/www/site-1.com/index.html
```

```html
<h1>Welcome to Site 1</h1>
```

```bash
vim /var/www/site-1.com/404.html
```

```html
<h1>the page you visit not exist</h1> 
```


---

## ⚙️ Step 3 – Configure Server Block

```nginx
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

## 🧪 Step 4 – Test Configuration

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🌐 Test in Browser

```
http://site-1.com

http://site-1.com/error

```

---

## 🧠 What I Learned

* How Nginx serves static files
* How server blocks work
* How to handle custom error pages

