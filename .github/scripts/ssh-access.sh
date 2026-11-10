#!/usr/bin/env bash
# Opens SSH (port 22) on the server's security group for this GitHub runner's
# IP only, and closes it again. Usage: ssh-access.sh allow | revoke
#
# Needs AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (an IAM user that may only
# change this security group), AWS_DEFAULT_REGION and SECURITY_GROUP.
# Until those secrets exist the step is skipped, so deploys keep working
# while port 22 is still open to everyone.
set -euo pipefail

DESCRIPTION="github-actions-deploy"

if [ -z "${AWS_ACCESS_KEY_ID:-}" ] || [ -z "${SECURITY_GROUP:-}" ]; then
  echo "Deploy AWS key or security group secret not set: not changing SSH access."
  exit 0
fi

case "${1:-}" in
  allow)
    ip=$(curl -fsS --retry 3 https://checkip.amazonaws.com | tr -d '[:space:]')
    if ! [[ "$ip" =~ ^[0-9]{1,3}(\.[0-9]{1,3}){3}$ ]]; then
      echo "Could not find this runner's public IP (got: '$ip')" >&2
      exit 1
    fi
    if out=$(aws ec2 authorize-security-group-ingress --group-id "$SECURITY_GROUP" \
        --ip-permissions "IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=$ip/32,Description=$DESCRIPTION}]" 2>&1); then
      # Only the job that added the rule removes it
      echo "ip=$ip" >> "$GITHUB_OUTPUT"
      echo "SSH allowed for this runner ($ip)"
    elif grep -q "InvalidPermission.Duplicate" <<< "$out"; then
      echo "SSH is already allowed for $ip (another deploy added it)"
    else
      echo "$out" >&2
      exit 1
    fi
    # Give the rule a moment to take effect
    sleep 5
    ;;
  revoke)
    aws ec2 revoke-security-group-ingress --group-id "$SECURITY_GROUP" \
      --protocol tcp --port 22 --cidr "${RUNNER_IP:?}/32" > /dev/null
    echo "SSH access for $RUNNER_IP removed"
    ;;
  *)
    echo "usage: $0 allow|revoke" >&2
    exit 2
    ;;
esac
