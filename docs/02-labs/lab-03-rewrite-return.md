# 🧪 Lab 03 – Rewrite & Return

## 🎯 Objective

* Understand redirects in Nginx
* Learn the difference between `rewrite` and `return`
* Redirect pages inside the same website
* Redirect between different domains

---

# 🏗️ Architecture

```id="ng1wfa"
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

# 🔁 Scenario 1 – Redirect Inside the Same Website

## 🎯 Goal

Redirect:

```id="g8ml4q"
site-2.com/old_page.html
```

To:

```id="x9mvhv"
site-2.com/new_page.html
```

---

## ⚙️ Nginx Configuration Using return

```nginx id="m9lkp0"
server {
    listen 80;
    server_name site-2.com;

    root /var/www/site-2.com;
    index index.html;

    location /old_page.html {
        return 301 /new_page.html;
    }
}
```

---

## 🧠 Explanation

When the user visits:

```id="hhmx57"
http://site-2.com/old_page.html
```

Nginx sends a:

```id="xfx22f"
301 Moved Permanently
```

Redirecting the browser to:

```id="x2um8l"
http://site-2.com/new_page.html
```

---

# 🔁 Scenario 2 – Using rewrite

## ⚙️ Configuration

```nginx id="8rxg0k"
location /old_page.html {
    rewrite ^/old_page.html$ /new_page.html permanent;
}
```

---

## 🧠 Explanation

The `rewrite` directive modifies URLs using regular expressions.

It is more flexible than `return`, but also more complex.

---

# ⚖️ return vs rewrite

| Feature                          | return | rewrite         |
| -------------------------------- | ------ | --------------- |
| Simplicity                       | Easy   | More complex    |
| Performance                      | Faster | Slightly slower |
| Regex support                    | No     | Yes             |
| Recommended for simple redirects | ✅ Yes  | ❌ No            |

---

# 🌐 Scenario 3 – Redirect Between Different Domains

## 🎯 Goal

Redirect:

```id="fp2a2d"
oldsite.com
```

To:

```id="5g6jl8"
site-2.com
```

---

## ⚙️ Nginx Configuration

```nginx id="lnzhfk"
server {
    listen 80;
    server_name oldsite.com;

    return 301 http://site-2.com$request_uri;
}
```

---

## 🧠 Explanation

If the user visits:

```id="bkk0n2"
http://oldsite.com/test
```

Nginx redirects the request to:

```id="24t1ca"
http://site-2.com/test
```

The variable:

```id="u6tvsl"
$request_uri
```

Preserves the original path and query string.

---

# 🧪 Testing Configuration

```bash id="5t3g8o"
sudo nginx -t
sudo systemctl reload nginx
```

---

# 🌐 Browser Testing

```id="htn9sh"
http://site-1.com/old_page.html
```

```id="r17vnk"
http://oldsite.com/test
```

---

# 🧠 What I Learned

* How redirects work in Nginx
* Difference between `rewrite` and `return`
* Redirecting pages and domains
* Using HTTP status code 301

