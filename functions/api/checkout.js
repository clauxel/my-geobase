import { handleLaunchCheckout } from '../_shared/veovido.js'

export async function onRequest(context) {
  return handleLaunchCheckout(context.request, context.env)
}

