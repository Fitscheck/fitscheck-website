import { api } from "./api"
import { API_ROUTES } from "./apiRoutes"

export async function fetchSubscriptions() {
  const res = await api.get(API_ROUTES.SUBSCRIPTIONS.LIST)
  return res.data.data.subscriptions
}

export async function updateSubscription(id: string, payload: any) {
  const res = await api.put(API_ROUTES.SUBSCRIPTIONS.UPDATE(id), payload)
  return res.data.data.subscription
}

export async function deleteSubscription(id: string) {
  const res = await api.delete(API_ROUTES.SUBSCRIPTIONS.DELETE(id))
  return res.data
}
export async function createSubscription(payload: any) {
    const res = await api.post(API_ROUTES.SUBSCRIPTIONS.CREATE, payload)
    return res.data.data.subscription
  }
  