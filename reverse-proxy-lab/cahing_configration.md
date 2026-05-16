1)  i made folder for cache to save the information 

sudo mkdir -p /var/cache/nginx 
sudo chown -R nginx:nginx /var/cache/nginx 

2) to add block of cache configration we add it in global file  /etc/nginx/nginx.conf under the http{} part 


proxy_cache_path /var/cache/nginx    # the place the information will save in it 
levels=1:2                          # the style or formate to save the information 
keys_zone=mycache:10m               # the name of memory zone and the size of the dictionary 
max_size=1g                        #  the max size of memory 
inactive=60m;                      # if the data not call or use after 60m delete it 





