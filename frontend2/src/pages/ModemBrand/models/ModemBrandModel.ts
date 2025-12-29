// ==================== API Response Types ====================
export interface ModemBrandApiResponse {
  id: number
  name: string
  detail: string | null
  created_at?: string
  updated_at?: string
}

// ==================== Frontend Models ====================
export interface ModemBrandModel {
  id: number
  name: string
  detail: string | null
  createdAt?: string
  updatedAt?: string
}

// ==================== Payloads ====================
export interface CreateModemBrandPayload {
  name: string
  detail: string
}

export interface UpdateModemBrandPayload {
  name?: string
  detail?: string
}

// ==================== Modal Types ====================
export type ModemBrandModalType = 'Add' | 'Edit' | null
