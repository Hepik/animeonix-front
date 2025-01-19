# AnimeOnix Frontend

The frontend for [AnimeOnix](https://animeonix.win/), providing an intuitive and responsive interface for exploring anime titles, writing reviews, and engaging with the community. Built with Next.js and TypeScript.

---

## Features

- **Responsive Design**: Optimized for desktop and mobile devices.
- **User-Friendly Interface**: Easy navigation and interaction.
- **Integration with Backend API**: Fetch and display anime data, reviews, and ratings.
- **Authentication**: User login and registration functionality.
- **Search and Filters**: Quickly find anime titles with advanced filters.

---

## Requirements

- **Node.js 20+**
- **Docker**
- Dependencies listed in `package.json` (automatically installed with Docker).

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Hepik/animeonix-front.git
cd animeonix-front
```

### Environment Variables

Copy the default `.default.env` file and update the values as needed:

```bash
cp .default.env .env
```

#### Example `.default.env` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Run Locally

To develop locally:

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. The app will be available at: `http://localhost:3000`.

### Run with Docker

To run the frontend in a containerized environment you need to visit backend repository

https://github.com/Hepik/animeonix-back

where is a docker-compose.yaml which starts all services (backend, database, Traefik, frontend).

```bash
docker-compose up -d
```

## Deployment

The frontend is deployed using Docker and Traefik. Key deployment configurations:

### Docker Compose Configuration

It`s just a frontend part

```yaml
frontend:
  image: ghcr.io/hepik/animeonix-front:latest
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.frontend.rule=Host(`animeonix.win`)"
    - "traefik.http.routers.frontend.entrypoints=websecure"
    - "traefik.http.routers.frontend.tls=true"
    - "traefik.http.routers.frontend.tls.certresolver=cloudflare"
  depends_on:
    - backend
```

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature`.
5. Open a pull request.

---

## Additional Information

For more details, visit the live website:
[AnimeOnix](https://animeonix.win/)

BackEnd repository: [animeonix-back](https://github.com/Hepik/animeonix-back)
