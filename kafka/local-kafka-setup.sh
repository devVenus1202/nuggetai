cd kafka-docker
docker-compose up -d
docker-compose scale kafka=3
bin/kafka-topics --create --zookeeper localhost:2181 --replication-factor 3 --partitions 5 --topic yahoo
bin/kafka-topics --describe --zookeeper localhost:2181 # see the topic
./bin/kafka-topics  --describe --topic yahoo1 --zookeeper localhost:2181
bin/kafka-console-producer --broker-list 192.168.0.7:32783 --topic yahoo1
bin/kafka-console-consumer --topic=yahoo1 --bootstrap-server=localhost:32785 --from-beginning
#Above will start 3 broker and zoo keeper

#To see the topic and whats happening on UI

# Local kafka set up , not using the above docker https://kafka.apache.org/quickstart

brew install kafka
cd /usr/local/Cellar/kafka/2.0.0/bin
./bin/zookeeper-server-start ./libexec/config/zookeeper.properties
./kafka-server-start /usr/local/etc/kafka/server.properties
kafka-topics --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
kafka-topics --list --zookeeper localhost:2181
