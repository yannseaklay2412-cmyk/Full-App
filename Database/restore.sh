#!/usr/bin/env bash
set -euo pipefail

# Restores a Postgres database from a local encrypted backup produced by
# Database/backup.sh (Database/backups/{roles,schema,data}_<timestamp>.sql.gpg).
# Uses the most recent backup found unless BACKUP_STAMP is given explicitly.
#
# Usage:
#   BACKUP_ENCRYPTION_KEY=<gpg passphrase> \
#   DB_URL=<target connection string> \
#   [BACKUP_STAMP=2026-07-13_14-00-00] \
#   ./Database/restore.sh

: "${BACKUP_ENCRYPTION_KEY:?Set BACKUP_ENCRYPTION_KEY to the GPG passphrase used for backups}"
: "${DB_URL:?Set DB_URL to the target database connection string}"

BACKUP_DIR="Database/backups"

if [ -z "${BACKUP_STAMP:-}" ]; then
  latest=$(ls "$BACKUP_DIR"/roles_*.sql.gpg 2>/dev/null | sort | tail -1)
  if [ -z "$latest" ]; then
    echo "No backups found in $BACKUP_DIR — aborting." >&2
    exit 1
  fi
  BACKUP_STAMP=$(basename "$latest" .sql.gpg)
  BACKUP_STAMP=${BACKUP_STAMP#roles_}
fi

echo "Using backup: $BACKUP_STAMP"

WORK_DIR=$(mktemp -d)
trap 'rm -rf "$WORK_DIR"' EXIT

echo "Decrypting backups..."
for name in roles schema data; do
  src="$BACKUP_DIR/${name}_${BACKUP_STAMP}.sql.gpg"
  if [ ! -f "$src" ]; then
    echo "Missing $src — aborting." >&2
    exit 1
  fi
  gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_KEY" --decrypt -o "$WORK_DIR/$name.sql" "$src"
done

echo "Applying roles.sql..."
psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$WORK_DIR/roles.sql"

echo "Applying schema.sql..."
psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$WORK_DIR/schema.sql"

echo "Applying data.sql..."
psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$WORK_DIR/data.sql"

echo "Restore complete."
