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
supabase db dump --db-url "$SUPABASE_URL" -f "$OUT_DIR/roles.sql" --role-only

echo "Dumping schema..."
supabase db dump --db-url "$SUPABASE_URL" -f "$OUT_DIR/schema.sql" --schema public

echo "Dumping data..."
supabase db dump --db-url "$SUPABASE_URL" -f "$OUT_DIR/data.sql" --data-only --use-copy --schema public

echo "Encrypting..."
for name in roles schema data; do
  gpg --batch --yes --passphrase "$BACKUP_ENCRYPTION_KEY" --symmetric --cipher-algo AES256 \
    -o "$OUT_DIR/${name}_${STAMP}.sql.gpg" "$OUT_DIR/$name.sql"
  rm "$OUT_DIR/$name.sql"
done

echo "Done. Encrypted backup files:"
ls "$OUT_DIR"/*"_${STAMP}.sql.gpg"
