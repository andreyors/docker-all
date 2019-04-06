FROM codercom/code-server:1.621

ENV RUNTIME_DEPS curl

RUN set -xe \
    && sudo apt-get update -qq \
    && sudo apt-get -yqq install --no-install-recommends ${RUNTIME_DEPS} \
    && curl -sL https://deb.nodesource.com/setup_8.x | sudo bash - \
    && sudo apt-get install -y nodejs \
    && sudo npm install -g yarn
    && sudo chown coder:coder /home/coder

CMD ["--allow-http", "--no-auth", "--user-data-dir", "/data", "--port", "8888", "/src"]
