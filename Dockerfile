FROM smapira/docker-microcule

## establish environmental variables
ARG git_access_token
ENV GIT_TOKEN=${git_access_token}

# copy basic files
COPY . /src
RUN export USER=root
RUN cd /src && yarn

RUN addgroup workers
RUN adduser --gid 1000 --disabled-password --gecos '' worker
RUN mkdir -p /var/chroot/bin
COPY ./bin /var/chroot/bin

WORKDIR /src

EXPOSE 3000
ENTRYPOINT ["/src/node_modules/.bin/nodemon", "/src/examples/express-source-github-repo.js"]