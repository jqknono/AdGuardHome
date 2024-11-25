cp ./dist/AdGuardHome_linux_amd64/AdGuardHome ./build/AdGuardHome
sudo mkdir -p ./build/work
sudo touch ./build/AdGuardHome.yaml
sudo ./build/AdGuardHome -w ./build/work --web-addr 0.0.0.0:50005 --local-frontend
sudo ./build/AdGuardHome -c ./build/AdGuardHome.yaml -w ./build/work --web-addr 0.0.0.0:50005 --local-frontend

# frontend
export NODE_OPTIONS=--openssl-legacy-provider
cd ./client/ && env NODE_ENV='development' npm run watch