FROM node:8-alpine AS base

RUN set -ex \
	&& mkdir -p /src

COPY package.json yarn.lock /src/

RUN set -ex \
	&& yarn install --frozen-lock --no-cache

COPY . /src
WORKDIR /src

CMD ["tail", "-f", "/dev/null"]

FROM base AS dev

RUN set -xe \
	&& apk --no-cache add git