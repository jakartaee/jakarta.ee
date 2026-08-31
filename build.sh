#!/bin/bash
# ===========================================================================
# Copyright (c) 2019 Eclipse Foundation and others.
#
# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/
#
# Contributors:
# Christopher Guindon (Eclipse Foundation)
#
# SPDX-License-Identifier: EPL-2.0
#
# ===========================================================================

set -o errexit
set -o nounset
set -o pipefail
IFS=$'\n\t'

yarn install --frozen-lockfile
yarn build
