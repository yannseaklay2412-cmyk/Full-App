# Database Setup

## Steps to set up locally

1. Make sure MySQL is installed and running
2. Run migrations:
   mysql -u root -p < migrations/001_create_tables.sql

3. (Optional) Run seeders for test data:
   mysql -u root -p < seeders/001_seed_data.sql

## Team collaboration rules
- Track ALL schema changes in migrations/ folder
- Always commit migration files to GitHub
- Share DB credentials PRIVATELY — NEVER push to GitHub!
