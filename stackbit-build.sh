#!/usr/bin/env bash

set -e
set -o pipefail
set -v

hugo
./inject-netlify-identity-widget.js public
