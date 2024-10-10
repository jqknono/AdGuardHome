# warn if not root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

docker run --rm --privileged multiarch/qemu-user-static --reset -p yes --credential yes
docker buildx rm buildx-builder
docker buildx create --name buildx-builder --driver docker-container --use
make build-release CHANNEL='release' VERSION='0.0.1' ARCH='amd64 arm64' OS='linux' SIGN='0'
