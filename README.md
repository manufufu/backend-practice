# Express Student API

## Environment Variables

This project uses a local `.env` file for runtime configuration.

### Required

- `MONGO_URI` - MongoDB connection string

### Optional

- `PORT` - Server port (default: `3000`)

## Setup

1. Create a `.env` file in the project root.
2. Add your environment values.
3. Start the app with:

```bash
npm start
```

Example `.env`:

```env
MONGO_URI=mongodb://localhost:27017/student-db
PORT=3000
```

## Important Notes

- Do not commit `.env` to git.
- Each developer should have their own `.env` values.
- If `.env` is deleted, recreate it from this README and team secret sources.
- Never put real production secrets in the repository.

## Suggested Team Practice

- Keep a `.env.example` file in the repo with placeholder values only.
- Store real secrets in a secret manager or secure team vault.
