export const useRequest = () => {
  async function send<T>(url: string, options: any = {}): Promise<{ data?: T; error?: string }> {
    try {
      const res = await $fetch<{ data?: T; error?: string }>(`/api${url}`, options)
      return res
    } catch (err: any) {
      return {
        error: err?.data?.error || err?.statusMessage || err?.message || 'Erreur inconnue'
      }
    }
  }

  return {
    get: <T>(url: string, opts: any = {}) => send<T>(url, { ...opts, method: 'GET' }),
    post: <T>(url: string, body: any, opts: any = {}) => send<T>(url, { ...opts, method: 'POST', body }),
    put: <T>(url: string, body: any, opts: any = {}) => send<T>(url, { ...opts, method: 'PUT', body }),
    patch: <T>(url: string, body: any, opts: any = {}) => send<T>(url, { ...opts, method: 'PATCH', body }),
    delete: <T>(url: string, opts: any = {}) => send<T>(url, { ...opts, method: 'DELETE' })
  }
}
