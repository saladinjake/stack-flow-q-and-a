# DevFlow Q&A Platform

## How to run the application

1. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```
2. Access the application:
   - Frontend: [http://localhost:3113](http://localhost:3113)
   - API: [http://localhost:5113](http://localhost:5113)

## How to seed the database

Run the following command to populate the database with sample questions and answers:
```bash
docker exec devflow_api npm run seed
```

Last updated: 2026-05-01
