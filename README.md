# taiv.io URL Shortener

Based on the tutorial from: https://coligo.io/create-url-shortener-with-node-express-mongo/

## Para inicializar la base de datos:
mongo
>use taivio
>db.counters.insert({ _id: 'url_count', seq: 1 })
