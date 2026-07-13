#!/usr/bin/env bash
set -euo pipefail

# Manual, local-only backup — run this by hand whenever you want a backup.
# No automation, no GitHub, no Google Drive. Dumps the database, encrypts it,
# and saves the result straight onto this machine.
#
# Usage:
#   SUPABASE_URL=<db connection string> \
#   BACKUP_ENCRYPTION_KEY=<gpg passphrase> \
#   ./Database/backup.sh

: "${SUPABASE_URL:?Set SUPABASE_URL to the database connection string}"
: "${BACKUP_ENCRYPTION_KEY:?Set BACKUP_ENCRYPTION_KEY to the GPG passphrase to encrypt with}"

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
