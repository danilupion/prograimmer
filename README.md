## Cloud

### Docker

#### Images creation

```bash
docker build -t prograimmer/base -f Dockerfile  .
docker build -t prograimmer/server -f apps/server/Dockerfile  .
docker build -t prograimmer/web -f apps/client/Dockerfile  .
```

#### Debugging the images

##### Base

```bash
docker container run -it --rm prograimmer/base /bin/sh
```

##### Server

```bash
docker container run -it --rm prograimmer/server /bin/sh
```

##### Web

```bash
docker container run -it --rm prograimmer/web /bin/sh
```

### Helm

#### Installing

##### Server

```bash
helm install -n prograimmer --create-namespace prograimmer-server ./apps/server/helm-chart
```

##### Web

```bash
helm install -n prograimmer --create-namespace prograimmer-web ./apps/web/helm-chart
```

#### Uninstalling

##### Server

```bash
helm uninstall -n prograimmer --create-namespace prograimmer-server
```

##### Web

```bash
helm uninstall -n prograimmer --create-namespace prograimmer-web ./apps/web/helm-chart
```

### Helmfile

Our setup works with environments, so assuming you created a values.yaml in the following path:

```
environments
  local
    values.yaml
```

#### Installation

```bash
helmfile apply -e local
```

#### Uninstalling

```bash
helmfile destroy -e local
```