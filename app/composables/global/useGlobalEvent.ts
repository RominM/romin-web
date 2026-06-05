type TEventName = string
type TSubscriberCallback<T = unknown> = (payload?: T) => void | boolean

class GlobalEventsManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private subscribers: Record<TEventName, Array<TSubscriberCallback<any>>> = {}
  private eventsQueue: Array<{ eventName: TEventName; payload: unknown }> = []
  private flushing = false

  public subscribeTo<T = unknown>(eventName: string, callback: TSubscriberCallback<T>) {
    if (!this.subscribers[eventName]) this.subscribers[eventName] = [callback]
    else this.subscribers[eventName].push(callback)

    onScopeDispose(() => {
      this.unsubscribeFrom(eventName, callback)
    })
  }

  public unsubscribeFrom<T = unknown>(eventName: string, callback: TSubscriberCallback<T>) {
    if (!this.subscribers[eventName]) return
    this.subscribers[eventName] = this.subscribers[eventName].filter((cb) => cb !== callback)
  }

  public async emitEvent<T = unknown>(eventName: string, payload?: T) {
    this.eventsQueue.push({ eventName, payload })
    this.flushEvents()
  }

  private async flushEvents(): Promise<void> {
    if (this.flushing) return
    this.flushing = true

    while (this.eventsQueue.length) {
      const event = this.eventsQueue.shift()
      if (event) this.dispatchEvent(event.eventName, event.payload)
    }

    this.flushing = false
  }

  private dispatchEvent<T = unknown>(eventName: string, payload: T) {
    if (!this.subscribers[eventName] || !this.subscribers[eventName].length) return
    for (const subscriber of this.subscribers[eventName]) {
      if (subscriber) {
        if (subscriber(payload)) return
      }
    }
  }
}

const globalEventsManager = new GlobalEventsManager()

export const useGlobalEvents = () => ({
  emitEvent: <T = unknown>(eventName: string, payload?: T) => {
    globalEventsManager.emitEvent<T>(eventName, payload)
  },
  subscribeTo: <T = unknown>(eventName: string, callback: TSubscriberCallback<T>) => {
    globalEventsManager.subscribeTo<T>(eventName, callback)
  },
  unsubscribeFrom: <T = unknown>(eventName: string, callback: TSubscriberCallback<T>) => {
    globalEventsManager.unsubscribeFrom<T>(eventName, callback)
  }
})
