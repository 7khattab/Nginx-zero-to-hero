1)  i made folder for cache to save the information 

sudo mkdir -p /var/cache/nginx 
sudo chown -R nginx:nginx /var/cache/nginx 

2) to add block of cache configration we add it in global file  /etc/nginx/nginx.conf under the http{} part 


proxy_cache_path /var/cache/nginx    # the place the information will save in it 
levels=1:2                          # the style or formate to save the information 
keys_zone=mycache:10m               # the name of memory zone and the size of the dictionary 
max_size=1g                        #  the max size of memory 
inactive=60m;                      # if the data not call or use after 60m delete it 



3) using cache we made it my server part : 

location / {

    proxy_pass http://backend_servers;

    proxy_cache mycache;                                   # using the cahe zone we make 

    proxy_cache_valid 200 10m;                              # any correct responce save it 10 minutes in cache 

    proxy_cache_use_stale error timeout updating
      http_500 http_502 http_503 http_504;  # if any error in server not give the error show old vsersion cache 

    add_header X-Cache-Status $upstream_cache_status; # add ( HIT - MISS - BYPASS - EXPIRED ) depend on cache status 

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

