# ------ builder ------
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.29-alpine3.22-slim
ARG BASE_IMAGE=prograimmer/base

FROM ${BASE_IMAGE} AS web-builder

# install dependencies
RUN pnpm install --filter=@prograimmer/client...

## build
RUN pnpm build --filter=@prograimmer/client

# ------ runtime ------
FROM ${NGINX_IMAGE} AS web-runtime

ARG PORT=8080
ARG ENV=production

COPY --from=web-builder /workspace/repo/apps/client/dist /usr/share/nginx/html
EXPOSE ${PORT}

# Overrides the default daemon on setting so NGINX doesn’t background itself. In a container you want the web server to stay in the foreground; when PID 1 exits the container stops.
CMD ["nginx", "-g", "daemon off;"]