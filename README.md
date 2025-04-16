This is a [Next.js](https://nextjs.org) project created to test how to conntrol and manage
costly resources with [Mutex](https://github.com/johnnycarreiro/mutex).

For this test lest's use [puppeteer](https://pptr.dev/) and create a single instance for it besides a custom [Mutex](https://github.com/johnnycarreiro/mutex)
intance to control max resource allocation.

## Getting Started

First, run the development server:
Use the  following commnads to run it locally on your host machine

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Use the following commands to run it on a docker container:

```bash
npm run docker:dev:shell
# or
pnpm run docker:dev:shell
# or
bun run docker:dev:shell
```

Before running the commands above, make sure you have [Docker](https://www.docker.com/) installed on your machine.
And you have built the image with the command `npm run docker:dev:build`

### Useful test commands:

```bash
# Run all tests
pnpm test
# Run all tests with coverage
pnpm test --coverage

# Run a manual test to api end point
curl -X POST -o foobar.png -d '{"url": "http://consolidados.digital", "width": 1000, "height": 1000, "deviceScaleFactor": 1}' -H 'Content-Type:a
pplication/json' http://localhost:3000/api/render
```
