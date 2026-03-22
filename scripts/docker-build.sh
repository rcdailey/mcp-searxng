#!/usr/bin/env bash
set -euo pipefail

# Build the project and package it into a Docker image.
# Usage: ./scripts/docker-build.sh [docker build args...]
# Example: ./scripts/docker-build.sh -t mcp-searxng:latest

pnpm install --frozen-lockfile
pnpm run build
pnpm prune --prod

docker build "$@" .
