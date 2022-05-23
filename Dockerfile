FROM alpine AS BUILD_IMAGE

RUN apk update && apk add yarn curl bash make && rm -rf /var/cache/apk/*

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

# install dependencies
RUN yarn --frozen-lockfile

COPY ./ ./

WORKDIR /usr/src/app/
RUN yarn install
RUN yarn build

RUN npm prune --production

RUN /usr/local/bin/node-prune

FROM alpine
#===================
# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN yarn add puppeteer@13.5.0


# Run everything after as non-privileged user.
RUN addgroup -S 1000 && adduser -S -G 1000 1000
#===================
USER 1000
RUN mkdir -p /home/node/app/
RUN mkdir -p /home/node/app/node_modules
RUN mkdir -p /home/node/app/dist

RUN chown -R 1000:1000 /home/node/app
RUN chown -R 1000:1000 /home/node/app/node_modules
RUN chown -R 1000:1000 /home/node/app/dist

WORKDIR /home/node/app

COPY --from=BUILD_IMAGE /usr/src/app/dist /home/node/app/dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules /home/node/app/node_modules

EXPOSE 3000
ENTRYPOINT ["node"]

CMD ["/home/node/app/dist/main.js"]

