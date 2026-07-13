#!/usr/bin/env bash
set -euo pipefail

# Manual, local-only backup — run this by hand whenever you want a backup.
# No automation, no GitHub, no Google Drive. Dumps the database, encrypts it,
# and saves the result straight onto this machine.
#
# Reads SUPABASE_URL / BACKUP_ENCRYPTION_KEY from Database/.env if present
# (see Database/.env.example), so you can just run:
#   ./Database/backup.sh
# Database/.env, if present, wins over anything set on the command line —
# don't mix the two, pick one way of supplying these values.

if [ -f "Database/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  source "Database/.env"
  set +a
fi

: "${SUPABASE_URL:?Set SUPABASE_URL to the database connection string (env var or Database/.env)}"
: "${BACKUP_ENCRYPTION_KEY:?Set BACKUP_ENCRYPTION_KEY to the GPG passphrase to encrypt with (env var or Database/.env)}"

OUT_DIR="Database/backups"
STAMP=$(date +%Y-%m-%d_%H-%M-%S)
mkdir -p "$OUT_DIR"

echo "Dumping roles..."
pg_dumpall --dbname="$SUPABASE_URL" --roles-only -f "$OUT_DIR/roles.sql"

echo "Dumping schema..."
pg_dump --dbname="$SUPABASE_URL" --schema-only --schema=public -f "$OUT_DIR/schema.sql"
# The "public" schema always already exists on any Postgres/Supabase database,
# so restoring this statement would fail with "already exists" every time.
sed -i '/^CREATE SCHEMA public;$/d' "$OUT_DIR/schema.sql"

echo "Dumping data..."
pg_dump --dbname="$SUPABASE_URL" --data-only --schema=public -f "$OUT_DIR/data.sql"

echo "Encrypting..."
for name in roles schema data; do
  gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_KEY" --symmetric --cipher-algo AES256 \
    -o "$OUT_DIR/${name}_${STAMP}.sql.gpg" "$OUT_DIR/$name.sql"
  rm "$OUT_DIR/$name.sql"
done

echo "Done. Encrypted backup files:"
ls "$OUT_DIR"/*"_${STAMP}.sql.gpg"
