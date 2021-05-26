brew install redis


```download mysql from here https://dev.mysql.com/downloads/mysql/```

```check which applications are running on a port ```

sudo lsof -n -i :8081 | grep LISTEN

```

```Install mongo```

brew install mongodb
sudo mkdir -p /data/db
sudo chown -R `id -un` /data/db
mongod

mongo (start shell) ; use nugget-object-store;


If not mysql already loaded -

sudo launchctl load -F com.oracle.oss.mysql.mysqld.plist

Password: ....

/Library/LaunchDaemons/com.oracle.oss.mysql.mysqld.plist: service already loaded
 
/usr/local/mysql/bin/mysql -u root -p // Or in local /usr/local/mysql/bin/mysql -u sapy -p (password empty)

Also can open via lefttopmost Mac Icon -> System Preference -> Mysql 
```



```create the db and all tables ```

/usr/local/mysql/bin/mysql -u root -p < /Users/diesel/Documents/nugget/migrations/mysqldb.sql

Use password - nugget123secretmysql

``` To Check, it worked. If not try this ```


CREATE USER 'sapy'@'localhost' IDENTIFIED BY 'nugget'; 
GRANT ALL PRIVILEGES ON * . * TO 'sapy'@'localhost';
ALTER USER 'sapy'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
ALTER USER 'sapy'@'localhost' IDENTIFIED BY '';

use nugget_db;
show tables;

```To connect to Prod mysql . 
Remember to edit security group ingress traffic rule allow all to be able to connect from local . 
To run the init script
```
/usr/local/mysql/bin/mysql -h aag11a027egxyz.c8rc790xmppq.us-east-2.rds.amazonaws.com -P 3306 -u sapy -p < /Users/diesel/Documents/nugget/migrations/mysqldb.sql

/usr/local/mysql/bin/mysql -h aag11a027egxyz.c8rc790xmppq.us-east-2.rds.amazonaws.com -P 3306 -u sapy -p

```
Incase you want to debug why npm install fails - 
sudo /opt/elasticbeanstalk/containerfiles/ebnode.py --action npm-install 2


sudo /opt/elasticbeanstalk/node-install/node-v6.14.1-linux-x64/bin/npm install - Npm install on EC2
sudo ln -s /opt/elasticbeanstalk/node-install/node-v6.14.1-linux-x64/bin/node /usr/bin/node - node link in ec2

```
// Connect to prod redias
sudo yum install telnet
telnet prod-redis-fresh.buu8uw.0001.use2.cache.amazonaws.com 6379

ssh -i ~/Downloads/mongo-key-pair.pem  ec2-user@52.15.131.207 - Mongo (Where would I get .pem files ? In mail from me to me gmail)

mongo --port 27017 -u "sapy" -p "nugget123secretmysql" --authenticationDatabase "admin";

AND DONT forget to create nugget-object-store DB manually

```

``` Code Archive command ```

git archive -v -o myapp.zip --format=zip HEAD