import { ApiResponse, SetStateFn } from '../../../shared/types'
import { IWatchService } from './IWatchService'
import {
  WatchModel,
  CreateWatchPayload,
  UpdateWatchPayload,
  ConfigureWatchPayload,
} from '../models/WatchModel'
import { MOCK_WATCHES } from '../data/mockWatchData'

export class WatchMockService implements IWatchService {
  private watches: WatchModel[] = [...MOCK_WATCHES]

  private delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async getWatches(platformId: string, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel[]>> {
    setLoading?.(true)
    await this.delay()
    setLoading?.(false)

    return {
      status: 200,
      message: 'Success',
      data: this.watches,
    }
  }

  async createWatch(payload: CreateWatchPayload, setLoading?: SetStateFn): Promise<ApiResponse<WatchModel>> {
    setLoading?.(true)
    await this.delay()
    setLoading?.(false)

    const newWatch: WatchModel = {
      id: Date.now(),
      code: payload.code,
      imei: payload.imei,
      deviceName: payload.device_name || null,
      sigueloDeviceId: null,
      platformId: payload.platform_id || null,
      platformName: null,
      isPending: true,
      responsabilityId: null,
      userResponsabilityId: null,
      userSuccessorId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.watches.push(newWatch)

    return {
      status: 200,
      message: 'Watch created successfully',
      data: newWatch,
    }
  }

  async updateWatch(
    id: number,
    payload: UpdateWatchPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<WatchModel>> {
    setLoading?.(true)
    await this.delay()
    setLoading?.(false)

    const index = this.watches.findIndex((w) => w.id === id)
    if (index === -1) {
      return {
        status: 404,
        message: 'Watch not found',
        data: null as unknown as WatchModel,
      }
    }

    const updatedWatch: WatchModel = {
      ...this.watches[index],
      ...(payload.imei && { imei: payload.imei }),
      ...(payload.code && { code: payload.code }),
      ...(payload.device_name !== undefined && { deviceName: payload.device_name }),
      ...(payload.platform_id !== undefined && { platformId: payload.platform_id }),
      updatedAt: new Date().toISOString(),
    }

    this.watches[index] = updatedWatch

    return {
      status: 200,
      message: 'Watch updated successfully',
      data: updatedWatch,
    }
  }

  async deleteWatch(id: number, setLoading?: SetStateFn): Promise<ApiResponse<void>> {
    setLoading?.(true)
    await this.delay()
    setLoading?.(false)

    const index = this.watches.findIndex((w) => w.id === id)
    if (index === -1) {
      return {
        status: 404,
        message: 'Watch not found',
        data: undefined as unknown as void,
      }
    }

    this.watches.splice(index, 1)

    return {
      status: 200,
      message: 'Watch deleted successfully',
      data: undefined as unknown as void,
    }
  }

  async configureWatch(
    payload: ConfigureWatchPayload,
    setLoading?: SetStateFn
  ): Promise<ApiResponse<WatchModel>> {
    setLoading?.(true)
    await this.delay()
    setLoading?.(false)

    const index = this.watches.findIndex((w) => w.id === payload.id)
    if (index === -1) {
      return {
        status: 404,
        message: 'Watch not found',
        data: null as unknown as WatchModel,
      }
    }

    const configuredWatch: WatchModel = {
      ...this.watches[index],
      platformId: payload.platform_id,
      isPending: false,
      sigueloDeviceId: Math.floor(Math.random() * 10000),
      updatedAt: new Date().toISOString(),
    }

    this.watches[index] = configuredWatch

    return {
      status: 200,
      message: 'Watch configured successfully',
      data: configuredWatch,
    }
  }
}
