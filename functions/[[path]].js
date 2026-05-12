import { handleRequest } from '../worker/index.js'

export async function onRequest({ request, env }) {
  return handleRequest(request, {
    ...env,
    SITE_ASSETS: env.SITE_ASSETS || env.ASSETS,
  })
}
