sudo docker build -t vue-nginx:1.0.0 .
sudo docker image prune -f
cd ..
sudo docker-compose down -v
sudo docker-compose up -d
