cp ./dist/AdGuardHome_linux_amd64/AdGuardHome ./build/AdGuardHome
sudo mkdir -p ./build/data/work
sudo touch ./build/data/AdGuardHome.yaml
sudo ./AdGuardHome --local-frontend

# frontend
export NODE_OPTIONS=--openssl-legacy-provider
cd ./client/ && env NODE_ENV='development' npm run watch