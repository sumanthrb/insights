---
layout: post
title: "Docker for Local Dev: Stop Fighting Your Environment"
date: 2025-01-10
tags: [docker, devops, tooling]
excerpt: "Your 'works on my machine' problem is solvable. Here's the setup that actually works."
---

The classic developer nightmare: you clone a repo, follow the README, and two hours later you're deep in a Python version conflict with no end in sight. Docker solves this entirely — if you set it up right.

## The Minimal Dev Container

Don't over-engineer it. A good local dev setup needs:

1. Your app running inside a container
2. Code changes reflected without rebuilding
3. The database and services running alongside

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app          # live code sync
      - /app/node_modules  # don't overwrite node_modules
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## A Good Dockerfile

```dockerfile
FROM node:20-slim

WORKDIR /app

# Install dependencies first (cached layer)
COPY package*.json ./
RUN npm ci

# Copy source after (invalidates cache only on source changes)
COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
```

The key is layer ordering: dependencies before source code. This way, rebuilds from source changes don't re-install packages.

## Make It One Command

Your dev environment should start with:

```bash
docker compose up
```

If it takes more than that, something is wrong. Put the complexity in your Docker config, not in your README.

## Teardown Without Fear

```bash
# Stop and remove containers, networks
docker compose down

# Also wipe volumes (fresh database)
docker compose down -v
```

Once you're running locally in Docker, "works on my machine" becomes "works on the same image we deploy". That's a significant upgrade.
