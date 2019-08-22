# Introduction to Web Development

## Index

1. [Session 0](#session-0)
2. [Session 1](#session-1)
3. [Session 2](#session-2)
4. [Session 3](#session-3)

## Session 0

### Pre-requisites

- A computer with GNU\Linux - Ubuntu  
- Browser - Chrome / Firefox
- [Nodejs](https://github.com/nodesource/distributions/blob/master/README.md) `> 8`
  ```
  $ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
  $ sudo apt-get install -y nodejs
  ```
- [VSCode](https://code.visualstudio.com/Download)
- [Postman](https://www.getpostman.com/downloads/)
- [SQLite](https://sqlite.org/download.html) 
  ```
  $ sudo apt-get install zlib1g:i386
  $ #or
  $ sudo apt-get install lib32z1
  ```

### An intro to the web

- Any process that runs on a port or a socket, waiting to recieve connections
  can be considered a `service`. 
- [How does the we work](https://www.youtube.com/watch?v=Dxcc6ycZ73M&list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7)? 
- IP Addresses, DNS and URLs
- All a website/webapp does is, do an `action` on a/many `resouce[s]` 

### The web browser

- `F12` 
- Not just `http://`
- The DOM
- HTML/CSS/JS

### Client and Server

- Header and payload - `curl -i http://localhost:3030/`
- The `action`
  ```
  C - POST
  R - GET
  U - PUT
  D - DELETE
  ```
- The `resource`
  ```
  /songs - GET
  /songs - POST
  /songs/1 - GET
  /songs/1 - PUT
  /songs/1 - DELETE
  ```
- The `data` for the `resource` can be in a database, a file or in memory of a server.

## Session 1

## Session 2

## Session 3
