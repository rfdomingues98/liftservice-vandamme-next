import {env} from '@/env.mjs'
import naturalCompare from 'natural-compare-lite'
import {UTApi} from 'uploadthing/server'

export const VIDEO_FILE = 'video.mp4'
export const VIDEO_POSTER_FILE = 'video-poster.jpg'

const IMAGE_EXTENSION = /\.(jpe?g|png|webp|avif)$/i

const utapi = new UTApi({token: env.UPLOADTHING_TOKEN})

function fileUrl(key: string) {
  return `https://${env.UPLOADTHING_APP_ID}.ufs.sh/f/${key}`
}

export type Video = {src: string; poster?: string}

/**
 * Reads the site's media from UploadThing. The video and its poster are
 * matched by file name; every other image is treated as a carousel photo.
 */
export async function getAssets() {
  const {files} = await utapi.listFiles({limit: 500})
  const uploaded = files.filter((file) => file.status === 'Uploaded')
  const byName = (name: string) => uploaded.find((file) => file.name === name)

  const video = byName(VIDEO_FILE)
  const poster = byName(VIDEO_POSTER_FILE)

  const photos = uploaded
    .filter(
      (file) =>
        IMAGE_EXTENSION.test(file.name) && file.name !== VIDEO_POSTER_FILE
    )
    .sort((a, b) => naturalCompare(a.name, b.name))
    .map((file) => fileUrl(file.key))

  return {
    photos,
    video: video
      ? {src: fileUrl(video.key), poster: poster && fileUrl(poster.key)}
      : undefined,
  }
}
