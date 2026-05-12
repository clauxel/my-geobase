import { handleAnalytics } from '../../_shared/veovido.js'

export async function onRequest(context) {
  return handleAnalytics(context.request, context.env)
}

