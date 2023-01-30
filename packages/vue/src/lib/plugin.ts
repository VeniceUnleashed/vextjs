import { App, markRaw } from "vue-demi"
import { setActiveVextBridge } from "./useVextBridge"

export const createVextPlugin = () => {
  return markRaw({
    install(app: App) {
      setActiveVextBridge();
    }
  })
}