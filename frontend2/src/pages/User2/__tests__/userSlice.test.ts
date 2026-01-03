import userReducer, {
  setUserList,
  addUser,
  updateUserInList,
  removeUser,
  setPermissionsList,
  setIsLoaded,
  setStatus,
} from '../slices/userSlice'
import { UserModel, PermissionModel } from '../models/UserModel'

describe('userSlice', () => {
  const initialState = {
    userList: [],
    permissionsList: [],
    isLoaded: false,
    status: 0,
    message: '',
  }

  const mockUser: UserModel = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    privilege: 1,
    active: 1,
  }

  const mockPermission: PermissionModel = {
    id: 1,
    name: 'modems',
  }

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
  })

  describe('setUserList', () => {
    it('should set the user list', () => {
      const users: UserModel[] = [mockUser]

      const state = userReducer(initialState, setUserList(users))

      expect(state.userList).toEqual(users)
      expect(state.userList).toHaveLength(1)
    })

    it('should replace existing user list', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }
      const newUsers: UserModel[] = [
        { ...mockUser, id: 2, name: 'New User' },
      ]

      const state = userReducer(existingState, setUserList(newUsers))

      expect(state.userList).toHaveLength(1)
      expect(state.userList[0].name).toBe('New User')
    })
  })

  describe('addUser', () => {
    it('should add a user to the list', () => {
      const state = userReducer(initialState, addUser(mockUser))

      expect(state.userList).toHaveLength(1)
      expect(state.userList[0]).toEqual(mockUser)
    })

    it('should append to existing users', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }
      const newUser: UserModel = { ...mockUser, id: 2, name: 'New User' }

      const state = userReducer(existingState, addUser(newUser))

      expect(state.userList).toHaveLength(2)
    })
  })

  describe('updateUserInList', () => {
    it('should update an existing user', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }
      const updatedUser: UserModel = { ...mockUser, name: 'Updated Name' }

      const state = userReducer(existingState, updateUserInList(updatedUser))

      expect(state.userList[0].name).toBe('Updated Name')
    })

    it('should not modify list if user not found', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }
      const nonExistentUser: UserModel = { ...mockUser, id: 999 }

      const state = userReducer(existingState, updateUserInList(nonExistentUser))

      expect(state.userList).toHaveLength(1)
      expect(state.userList[0].id).toBe(1)
    })

    it('should update active status correctly', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }
      const deactivatedUser: UserModel = { ...mockUser, active: 0 }

      const state = userReducer(existingState, updateUserInList(deactivatedUser))

      expect(state.userList[0].active).toBe(0)
    })
  })

  describe('removeUser', () => {
    it('should remove a user by id', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser, { ...mockUser, id: 2 }],
      }

      const state = userReducer(existingState, removeUser(1))

      expect(state.userList).toHaveLength(1)
      expect(state.userList[0].id).toBe(2)
    })

    it('should not modify list if user not found', () => {
      const existingState = {
        ...initialState,
        userList: [mockUser],
      }

      const state = userReducer(existingState, removeUser(999))

      expect(state.userList).toHaveLength(1)
    })
  })

  describe('setPermissionsList', () => {
    it('should set the permissions list', () => {
      const permissions: PermissionModel[] = [mockPermission]

      const state = userReducer(initialState, setPermissionsList(permissions))

      expect(state.permissionsList).toEqual(permissions)
    })

    it('should handle multiple permissions', () => {
      const permissions: PermissionModel[] = [
        { id: 1, name: 'modems' },
        { id: 2, name: 'sims' },
        { id: 3, name: 'cars' },
      ]

      const state = userReducer(initialState, setPermissionsList(permissions))

      expect(state.permissionsList).toHaveLength(3)
    })
  })

  describe('setIsLoaded', () => {
    it('should set isLoaded to true', () => {
      const state = userReducer(initialState, setIsLoaded(true))

      expect(state.isLoaded).toBe(true)
    })

    it('should set isLoaded to false', () => {
      const existingState = { ...initialState, isLoaded: true }

      const state = userReducer(existingState, setIsLoaded(false))

      expect(state.isLoaded).toBe(false)
    })
  })

  describe('setStatus', () => {
    it('should set status and message', () => {
      const state = userReducer(
        initialState,
        setStatus({ status: 200, message: 'Success' })
      )

      expect(state.status).toBe(200)
      expect(state.message).toBe('Success')
    })

    it('should handle error status', () => {
      const state = userReducer(
        initialState,
        setStatus({ status: 500, message: 'Server Error' })
      )

      expect(state.status).toBe(500)
      expect(state.message).toBe('Server Error')
    })
  })
})
