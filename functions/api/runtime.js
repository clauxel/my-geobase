import { handleRuntime } from '../_shared/veovido.js'

export async function onRequest(context) {
  return handleRuntime(context.request)
}

