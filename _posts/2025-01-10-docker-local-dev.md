---
layout: post
title: "Docker for Local Dev: Stop Fighting Your Environment"
date: 2025-01-10
tags: [docker, devops, tooling]
excerpt: "Your 'works on my machine' problem is solvable. Here's the setup that actually works."
---

The classic developer nightmare: you clone a repo, follow the README, and two hours later you're deep in a Python version conflict with no end in sight. Docker solves this entirely — if you set it up right.
----

Capability
GitHub 
Actions
GitLab CI/CD
Jenkins
AWS Code Pipeline
Azure DevOps Pipelines
Google Cloud Build
Harness
Type
SaaS / Hosted + Self-hosted runners
SaaS + Self-managed
Self-hosted (primarily)
Fully managed (serverless)
SaaS + Hybrid
Serverless CI
SaaS (enterprise CD)
Core Strength
Native GitHub integration
All-in-one DevOps
Extreme flexibility
AWS-native pipelines
Enterprise DevOps suite
Fast container builds
Intelligent CD (AI-driven)
Setup Complexity
* 
Very Low
**
Medium
***
High
**
Medium
**
Medium
*
Low
*** Medium-High
Maintenance Overhead
Very low
Low–Medium
Very high
Very low
Medium
Very low
Low
Pipeline Config
YAML (event-driven)
YAML (stages/jobs)
Groovy / YAML (via plugins)
JSON/YAML (AWS configs)
YAML / UI
YAML
UI + YAML
Execution Model
Ephemeral runners (stateless jobs) 
Runner-based (parallel stages) 
Persistent agents/controllers
Event-driven AWS services
Agent-based + serverless
Fully serverless builds
Managed pipelines with orchestration
Scalability
High (auto-scaling runners)
High
Depends on infra
High (serverless)
High
Very high (serverless)
High
Ecosystem Integration
GitHub ecosystem (strong)
Full DevOps lifecycle (code → deploy)
Plugins (1800+) 
Deep AWS services
Microsoft ecosystem
GCP services
Multi-cloud
Security Features
Basic + integrations
Built-in SAST/DAST, compliance 
Plugin-based
IAM-based controls
Enterprise security + RBAC
IAM + GCP security
Policy + governance
Deployment Capabilities
Basic (needs external tools)
Built-in environments
Plugin-driven
Native AWS deploy
Built-in releases
Needs GCP deploy tools
Advanced (canary, rollback)
Kubernetes Support
Via actions
Native + strong
Via plugins
ECS/EKS integration
AKS integration
GKE-native
Strong (progressive delivery)
Multi-Cloud Support
Limited (DIY)
Moderate
High
AWS only
Azure-centric (some multi-cloud)
GCP only
Strong multi-cloud
Observability
Basic logs
Strong pipeline visualization
Plugin-based
CloudWatch integration
Azure Monitor
Cloud Logging
Advanced metrics + insights
Cost Model
Free tier + usage-based minutes 
Free + paid tiers
Free (infra cost)
Pay-per-use
Free + enterprise pricing
Pay-per-build
Enterprise pricing
Best For
GitHub-first teams
Platform engineering teams
Custom enterprise pipelines
AWS-native workloads
Enterprise/MS stack
GCP-native apps
Mature DevOps orgs
Learning Curve
Low
Medium
High
Medium
Medium
Low
Medium-High
Vendor Lock-in
Medium (GitHub)
Medium
Low
High (AWS)
Medium (Azure)
High (GCP)
Low–Medium




-----


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
