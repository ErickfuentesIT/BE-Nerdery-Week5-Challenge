# Store App

## Requirements

Before getting started, make sure you have the following installed:

- **Node.js**: version `22.13.0`
- **Docker Desktop**
- **Your PostgreSQL client of your preference**
- **Postman**

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

```
DATABASE_URL="postgresql://{POSGRES_USER}:{PASSWORD_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
JWT_SECRET="YOUR_SUPER_SECRET_WORD"
PORT="YOUR_PORT"
```

6. Run prisma

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

```bash
npx prisma db seed
```

## Running the app

```bash
npm run dev
```

## Testing the app

You can reach out the Postman collection
***
https://www.postman.com/dps777/workspace/nerdery-week5-rest/request/29371382-284fb51c-043a-441b-b035-983124d1ade0?action=share&creator=29371382&ctx=documentation&active-environment=29371382-e940085f-8233-4978-80b3-40d0c648e0b0

