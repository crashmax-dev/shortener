# ie.vercel.app

![GitHub deployments](https://img.shields.io/github/deployments/crashmax-dev/shortener/production?label=deployment&style=for-the-badge&labelColor=000000)
[![Deploy with Vercel](https://img.shields.io/badge/deploy%20with%20vercel-informational?style=for-the-badge&logo=vercel&logoColor=ffffff&color=000000)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fcrashmax-dev%2Fshortener)

## Overview

- `pages/*` - All other static pages.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction).

## Running Locally

```bash
$ git clone https://github.com/crashmax-dev/shortener.git
$ cd shortener
$ npm install
$ npm run dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/crashmax-dev/shortener/blob/master/.env.example).

## Built Using

- [Next.js](https://nextjs.org)
- [Vercel](https://vercel.com)
- [MongoDB](https://mongodb.com)

## TODO

- Создание личного кабинета (работа с JWT)
- Добавить удаление ссылок из базы данных
- Выводить на клиенте информацию о ссылке (количество переходов, дата создания)
- Доработать передачу дополнительных параметров (slug/query) в ссылку при перенаправлении
- Добавить опциональный input для кастомного slug'a
- Доработать design
