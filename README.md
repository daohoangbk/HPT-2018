## Hướng dẫn cài đặt

###I. Cài đặt phần mềm

1. [XAMPP 5.6](https://www.apachefriends.org/download.html)
2. [Nodejs 8 ](https://nodejs.org/en/) và [npm](https://www.npmjs.com/)
3. truffle framework bằng npm: `npm install -g truffle`
4. [Metamask extension ](https://metamask.io/)

###II. Chạy chương trình
####1. Chạy backend php:
* import database file `hpt20182.sql` trên http://localhost/phpmyadmin<br>
* Run thư mục `php-backend` qua server apache

####2. Chạy private blockchain trufle
Bật terminal trong thư mục `auction-ethereum` và chạy các lệnh:<br>
* `truffle develop`. Lúc này hiện ra console develop của truffle
* Trong console của truffle develop gõ lệnh `migrate --reset`<br>
Lúc này private blockchain được khởi chạy và tích hợp smart contract `Auction`

####3. Chạy chương trình frontend 
Bật terminal trong thư mục `auction-frontend` và chạy các lệnh sau:
* `npm install` để cài đặt các package 
* `npm start` để bật chương trình trên trình duyệt mặc định 

