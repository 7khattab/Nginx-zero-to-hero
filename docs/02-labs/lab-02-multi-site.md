# 🧪 Lab 02 – Multi Site & Directory Listing

## 🎯 Objective

* Configure multiple websites in Nginx
* Understand server blocks
* Enable directory listing using autoindex

---

## 🏗️ Architecture

```id="txu5o0"
Client Browser
       │
       ▼
    Nginx
       │
 ┌───────────────┐
 │               │
 ▼               ▼
site-1.com    site-2.com
```

---

## ⚙️ Step 1 – Create Website Directory

```bash id="lqysyn"
mkdir -p /var/www/site-2.com
```

---

## 📄 Step 2 – Create HTML Page

```bash id="qb01d4"
vim /var/www/site-2.com/index.html
```

```html id="cq7lza"
<h1>Welcome to Site 2</h1>
```

---

## 📁 Step 3 – Create Files Directory

```bash id="ty55g8"
mkdir -p /var/www/site-2.com/files
```

---

## 📄 Create Test Files

```bash id="2ktlyh"
touch /var/www/site-2.com/files/file1.txt
touch /var/www/site-2.com/files/file2.txt
```

---

## ⚙️ Step 4 – Configure Server Block

```bash id="e0ijqm"
vim /etc/nginx/conf.d/site-2.com.conf
```

---

## 🔧 Nginx Configuration

```nginx id="y1mtvw"
server {
    listen 80;
    server_name site-2.com;

    root /var/www/site-2.com;
    index index.html;

    location /files/ {
        autoindex on;
    }
}
```

---

## 🧠 Understanding autoindex

The `autoindex` directive allows Nginx to display directory contents directly in the browser.

Example:

```id="9ow78n"
http://site-2.com/files/
```

Nginx will display all files inside:

```id="d4wth1"
/var/www/site-2.com/files/
```

---

## ⚠️ Security Note

Directory listing is useful for labs and testing environments.

It is NOT recommended in production environments.

---

## ⚙️ Step 5 – Set Permissions

```bash id="k7k3tl"
sudo chown -R nginx:nginx /var/www/site-2.com
sudo chmod -R 755 /var/www/site-2.com
```

---

## 🧪 Step 6 – Test Configuration

```bash id="1y4nff"
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🌐 Browser Testing

Main website:

```id="n9l11u"
http://site-2.com
```

Directory listing:

```id="pl4fp2"
http://site-2.com/files/
```

---

## 🧠 What I Learned

* How to host multiple websites in Nginx
* How server blocks work
* How directory listing works
* Using autoindex in Nginx

