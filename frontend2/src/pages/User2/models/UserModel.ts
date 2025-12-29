// Modal types
export type ModalType = 'Add' | 'Edit' | 'Permissions'

// User Model (UI - camelCase)
export interface UserModel {
  id: number
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}

// User API Response (snake_case)
export interface UserApiResponse {
  id: number
  name: string
  email: string
  created_at?: string
  updated_at?: string
}

// Permission Model
export interface PermissionModel {
  id: number
  name: string
  guardName?: string
}

// Permission API Response
export interface PermissionApiResponse {
  id: number
  name: string
  guard_name?: string
}

// Create User Payload
export interface CreateUserPayload {
  name: string
  email: string
  password: string
}

// Update User Payload
export interface UpdateUserPayload {
  id: number
  name: string
  email: string
  password?: string
}

// Toggle Permission Payload
export interface TogglePermissionPayload {
  user_id: number
  permission: string
}
