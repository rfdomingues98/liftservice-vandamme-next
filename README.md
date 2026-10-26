This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Media (UploadThing)

The video and carousel photos are served from [UploadThing](https://uploadthing.com) so they don't count against Vercel bandwidth. Set these env vars (locally in `.env.local` and in Vercel):

- `UPLOADTHING_TOKEN` – from the UploadThing dashboard → API Keys
- `UPLOADTHING_APP_ID` – the app id (the subdomain in `https://<APP_ID>.ufs.sh`)

Upload files through the UploadThing dashboard. The page picks them up within an hour (`revalidate = 3600`):

- `video.mp4` – the video in the About section, and `video-poster.jpg` its preview frame
- any other image – a carousel photo, sorted by file name (`carousel1-min.jpg`, `carousel2-min.jpg`, …)

Resize photos before uploading, since they are served as-is, e.g. `ffmpeg -i in.jpg -vf scale=1450:-2 -q:v 4 out.jpg`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
