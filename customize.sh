# install nodejs
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - && sudo apt-get install -y nodejs

# install npm
sudo apt install npm

# install yarn
npm install -g yarn

# install go
wget https://go.dev/dl/go1.22.1.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.22.1.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# install tools
sudo apt install -y gpg gzip sed tar zip

# In order to build AdGuard Home with Node.js 17 and later, specify `--openssl-legacy-provider` option.
export NODE_OPTIONS=--openssl-legacy-provider

# build dist
make build-release CHANNEL='release' VERSION='0.0.1' ARCH='amd64 arm64' OS='linux' SIGN='0'

# build docker
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes --credential yes
docker buildx create --name buildx-builder --driver docker-container --use
# make build-docker CHANNEL='release' VERSION='0.0.1' DOCKER_IMAGE_NAME='adguard-private'
make build-docker CHANNEL='development' VERSION='0.0.1' DOCKER_IMAGE_NAME='adguardhome' DOCKER_OUTPUT='type=image,name=docker.io/jqknono/adguardhome:v1.0,push=true'

# alpine证书错误解决方法
nginx -s stop -c /home/test/code/adguard_private/temp/master/app/nginx/nginx.conf -p /home/test/code/adguard_private/temp/master/app/nginx
sudo iptables -D PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 1080
sudo iptables -D PREROUTING -t nat -p tcp --dport 443 -j REDIRECT --to-port 1443
sudo iptables -D PREROUTING -t nat -p tcp --dport 853 -j REDIRECT --to-port 1853
sudo ip6tables -D PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 1080
sudo ip6tables -D PREROUTING -t nat -p tcp --dport 443 -j REDIRECT --to-port 1443
sudo ip6tables -D PREROUTING -t nat -p tcp --dport 853 -j REDIRECT --to-port 1853

# 登录docker
docker login
jqknono:4:dtWaNkCPVsrwE
