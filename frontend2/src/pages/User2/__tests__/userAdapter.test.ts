import {
  adaptUserResponseToModel,
  adaptUserListResponseToModel,
  adaptPermissionResponseToModel,
  adaptPermissionListResponseToModel,
} from '../adapters/userAdapter'
import { UserApiResponse, PermissionApiResponse } from '../models/UserModel'

describe('User Adapters', () => {
  describe('adaptUserResponseToModel', () => {
    it('should correctly map API response to UserModel', () => {
      const apiResponse: UserApiResponse = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        privilege: 1,
        active: 1,
        created_at: '2025-01-01T00:00:00.000000Z',
        updated_at: '2025-01-02T00:00:00.000000Z',
      }

      const result = adaptUserResponseToModel(apiResponse)

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        privilege: 1,
        active: 1,
        createdAt: '2025-01-01T00:00:00.000000Z',
        updatedAt: '2025-01-02T00:00:00.000000Z',
      })
    })

    it('should handle missing optional fields', () => {
      const apiResponse: UserApiResponse = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        privilege: 0,
        active: 0,
      }

      const result = adaptUserResponseToModel(apiResponse)

      expect(result.id).toBe(1)
      expect(result.name).toBe('Test User')
      expect(result.createdAt).toBeUndefined()
      expect(result.updatedAt).toBeUndefined()
    })

    it('should correctly map inactive user', () => {
      const apiResponse: UserApiResponse = {
        id: 2,
        name: 'Inactive User',
        email: 'inactive@example.com',
        privilege: 1,
        active: 0,
      }

      const result = adaptUserResponseToModel(apiResponse)

      expect(result.active).toBe(0)
    })
  })

  describe('adaptUserListResponseToModel', () => {
    it('should correctly map array of API responses', () => {
      const apiResponses: UserApiResponse[] = [
        {
          id: 1,
          name: 'User 1',
          email: 'user1@example.com',
          privilege: 1,
          active: 1,
        },
        {
          id: 2,
          name: 'User 2',
          email: 'user2@example.com',
          privilege: 0,
          active: 1,
        },
      ]

      const result = adaptUserListResponseToModel(apiResponses)

      expect(result).toHaveLength(2)
      expect(result[0].id).toBe(1)
      expect(result[1].id).toBe(2)
    })

    it('should return empty array for empty input', () => {
      const result = adaptUserListResponseToModel([])

      expect(result).toEqual([])
    })
  })
})

describe('Permission Adapters', () => {
  describe('adaptPermissionResponseToModel', () => {
    it('should correctly map permission API response', () => {
      const apiResponse: PermissionApiResponse = {
        id: 1,
        name: 'modems',
        guard_name: 'api',
      }

      const result = adaptPermissionResponseToModel(apiResponse)

      expect(result).toEqual({
        id: 1,
        name: 'modems',
        guardName: 'api',
      })
    })

    it('should handle missing guard_name', () => {
      const apiResponse: PermissionApiResponse = {
        id: 1,
        name: 'sims',
      }

      const result = adaptPermissionResponseToModel(apiResponse)

      expect(result.id).toBe(1)
      expect(result.name).toBe('sims')
      expect(result.guardName).toBeUndefined()
    })
  })

  describe('adaptPermissionListResponseToModel', () => {
    it('should correctly map array of permission responses', () => {
      const apiResponses: PermissionApiResponse[] = [
        { id: 1, name: 'modems' },
        { id: 2, name: 'sims' },
        { id: 3, name: 'cars' },
      ]

      const result = adaptPermissionListResponseToModel(apiResponses)

      expect(result).toHaveLength(3)
      expect(result.map((p) => p.name)).toEqual(['modems', 'sims', 'cars'])
    })

    it('should return empty array for empty input', () => {
      const result = adaptPermissionListResponseToModel([])

      expect(result).toEqual([])
    })
  })
})
