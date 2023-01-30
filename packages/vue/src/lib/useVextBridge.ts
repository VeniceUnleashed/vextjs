import { getCurrentInstance, inject, InjectionKey } from 'vue-demi';
import { VextBridge, NoopVextBridge } from '@vextjs/bridge';

export const VextBridgeSymbol = Symbol(
  'vext-bridge'
) as InjectionKey<VextBridge>;

let activeVextBridge: VextBridge = new NoopVextBridge();

export const setActiveVextBridge = (bridge: VextBridge) =>
  (activeVextBridge = bridge);

export const useVext = () =>
  (getCurrentInstance() && inject(VextBridgeSymbol)) || activeVextBridge;
