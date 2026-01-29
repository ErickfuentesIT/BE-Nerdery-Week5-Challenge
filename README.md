# Store App

## Requirements

Before getting started, make sure you have the following installed:

- **Node.js**: version `22.13.0`
- **Docker Desktop**
- **Your PostgreSQL client of your preference**

## Installation

1. Clone the repository:

```bash
git clone git@github.com:ravnhq/BE-Nerdery-Week5-Challenge.git
```

2. Install dependencies

```bash
npm i
```

3. Run the `docker.compose.yml` file inside of this folder to mount the container.

```bash
docker-compose -f docker.compose.yml up
```

4. If everything goes well, please, open your client of your preference using the next credentials.

```
POSTGRES_PASSWORD: password123
POSTGRES_USER: postgres
POSTGRES_DB: nerdery_db_w5c2
```

5. Create an `.env` file following the example provided in this repository.

6. Run prisma migrations

```bash
npx prisma migrate dev
```

## Running the app

```bash
npm run dev
```

## Testing the app
