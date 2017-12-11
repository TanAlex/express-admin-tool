# Node Express Admin Tool

This is a project to use Node + Express + MySQL + Redis + Session + NodeMailer 
It will serve as a template for all Admin Tools related web applications

## Getting Started

Here is the steps to setup environment on AWS

### Setup Node and Docer

Install Node on AWS AMI server
```
sudo su -

yum update -y

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
. ~/.nvm/nvm.sh
nvm ls-remote
nvm install v8.9.3
```

Install Docker
```
yum install -y docker
service docker start
docker info
usermod -a -G docker ec2-user
```

Install Docker MySQL and mount it on a local volume and expose to local port
```
mkdir -p /db/db01
docker run --name mysql-db-01 -v /db/db01:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=P@ssw0rd! -d mysql:5.7.20
```

Refer to 
* [Docker MySQL](https://hub.docker.com/_/mysql/) - docker mysql


Install Docker Redis
```
docker run --name redis-01 -p 6379:6379 -d redis
```

Refer to 
* [Docker Redis](https://hub.docker.com/_/redis/) - docker Redis

Install telent on localhost
```
yum install telnet -y
```



### Checkout code and run it on the instance
Work Flow

ON local laptop
```
git push origin master 

//On server
cd /app/express-admin-tool
# git clone https://github.com/TanAlex/express-admin-tool.git
# npm install
git pull 
```
You can either run:
```
npm run watch
```

or just 
```
webpack -w
```

Then start the app
```
node bin/www
```

You can access the app on 
http://ec2-54-187-197-211.us-west-2.compute.amazonaws.com:3000/login

