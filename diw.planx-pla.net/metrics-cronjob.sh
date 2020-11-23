#!/bin/bash
#
# Custom metrics cron job - publishes to dashboard.
#
# Save daily metrics to the commons dashboard.
# Run as cron job in commons@adminvm user account
#
# PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# vpc_name=YOUR-VPC-NAME
# KUBECONFIG=path/to/kubeconfig
# 3   3   *   *   *    (if [ -f $HOME/gitops-dev/diw.planx-pla.net/metrics-cronjob.sh ]; then bash $HOME/cdis-manifest/diw.planx-pla.net/metrics-cronjob.sh "vpc=$vpc_name"; else echo "no metrics
# -cronjob.sh"; fi) > $HOME/metrics-cronjob.log 2>&1

# setup --------------------

export GEN3_HOME="${GEN3_HOME:-"$HOME/cloud-automation"}"

if ! [[ -d "$GEN3_HOME" ]]; then
  echo "ERROR: this does not look like a gen3 environment - check $GEN3_HOME and $KUBECONFIG"
  exit 1
fi

PATH="${PATH}:/usr/local/bin"

source "${GEN3_HOME}/gen3/gen3setup.sh"

# lib -------------------------

help() {
  cat - <<EOM
Use: bash ./metricsß-cronjob.sh vpc=YOUR_VPC_NAME
EOM
}


# main -----------------------

if [[ -z "$USER" ]]; then
  export USER="$(basename "$HOME")"
fi

if [[ $# -lt 1 || ! "$1" =~ ^vpc=.+$ ]]; then
  echo "ERROR: first argument must be `vpc=YOUR-VPC-NAME`"
  help
  exit 1
fi

dataFolder="$(mktemp -d -p "$XDG_RUNTIME_DIR" 'metricsFolder_XXXXXX')"
cd "$dataFolder"

gen3 jupyter metrics upload

cd /tmp
/bin/rm -rf "${dataFolder}"
