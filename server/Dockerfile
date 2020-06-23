# FROM node:alpine as CLIENT_BUILD
# WORKDIR '/client_build'
# COPY ../client/ ./
# RUN ["npm","install"]
# RUN ["npm","run","build"]
# remove all except build dir
# put build dir into public/

# FROM CLIENT_BUILD
FROM node:alpine
WORKDIR '/app'
COPY ./ ./
RUN ["npm","install"]
RUN ["npm","run","docs"]

CMD ["npm","run","start"]
