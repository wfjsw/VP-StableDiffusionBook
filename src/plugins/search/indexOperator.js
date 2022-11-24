function generateCallbackID() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useIndexer() {
    const worker = new Worker(new URL('./indexWorker.js', import.meta.url), {
        type: 'module',
    })
    
    const eventBus = {
        listeners: {},
        on(callbackID, callback) {
            this.listeners[callbackID] = callback
        },
        emit(callbackID, data) {
            this.listeners[callbackID]?.(data)
            delete this.listeners[callbackID]
        },
    }

    worker.addEventListener('message', (e) => {
        const { callbackID, ...data } = e.data
        eventBus.emit(callbackID, data)
    })
    
    return {
        loadIndex() {
            const callbackID = generateCallbackID()
            
            return new Promise((resolve, reject) => {
                eventBus.on(callbackID, (event) => {
                    if (event.type === 'success') {
                        resolve(event.result)
                    } else {
                        reject(event.result)
                    }
                })
                worker.postMessage({ type: 'loadIndex', callbackID })
            })
        },
        search(query, origin) {
            const callbackID = generateCallbackID()
            
            return new Promise((resolve, reject) => {
                eventBus.on(callbackID, (event) => {
                    if (event.type === 'success') {
                        resolve(event.result)
                    } else {
                        reject(event.result)
                    }
                })
                worker.postMessage({ type: 'search', callbackID, query, origin })
            })
        },
    }
}
