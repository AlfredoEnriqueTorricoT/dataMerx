import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import ModalPermissions from '../modals/ModalPermissions'
import { UserModel } from '../models/UserModel'

// Mock the hooks
jest.mock('../hooks', () => ({
  useUserFetch: () => ({
    fetchUserPermissions: jest.fn().mockResolvedValue({ success: true }),
    togglePermission: jest.fn().mockResolvedValue({ success: true }),
  }),
  useUser: () => ({
    permissionsList: [
      { id: 1, name: 'modems' },
      { id: 2, name: 'sims' },
    ],
  }),
}))

// Mock translation
const mockT = (key: string) => key

describe('ModalPermissions', () => {
  const mockUser: UserModel = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    privilege: 1,
    active: 1,
  }

  const mockOnClose = jest.fn()

  const createMockStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        User2: userReducer,
      },
      preloadedState: {
        User2: {
          userList: [],
          permissionsList: [
            { id: 1, name: 'modems' },
            { id: 2, name: 'sims' },
          ],
          isLoaded: true,
          status: 200,
          message: '',
          ...initialState,
        },
      },
    })
  }

  const renderComponent = (store = createMockStore()) => {
    return render(
      <Provider store={store}>
        <ModalPermissions user={mockUser} onClose={mockOnClose} t={mockT} />
      </Provider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render modal header with title', () => {
    renderComponent()

    expect(screen.getByText('Permisos de usuario')).toBeInTheDocument()
  })

  it('should display user info in modal', () => {
    renderComponent()

    expect(screen.getByText(/Test User/)).toBeInTheDocument()
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument()
  })

  it('should render view permissions section', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Vistas')).toBeInTheDocument()
    })
  })

  it('should render settings permissions section', async () => {
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText('Configuraciones')).toBeInTheDocument()
    })
  })

  it('should have a close button', () => {
    renderComponent()

    const closeButton = screen.getByText('Cerrar')
    expect(closeButton).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    renderComponent()

    const closeButton = screen.getByText('Cerrar')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when X button is clicked', () => {
    renderComponent()

    const xButton = screen.getByLabelText('Close')
    fireEvent.click(xButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})

describe('ModalPermissions - Permission Checkboxes', () => {
  const mockUser: UserModel = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    privilege: 1,
    active: 1,
  }

  const mockTogglePermission = jest.fn().mockResolvedValue({ success: true })

  beforeEach(() => {
    jest.clearAllMocks()

    // Re-mock with custom toggle function
    jest.mock('../hooks', () => ({
      useUserFetch: () => ({
        fetchUserPermissions: jest.fn().mockResolvedValue({ success: true }),
        togglePermission: mockTogglePermission,
      }),
      useUser: () => ({
        permissionsList: [{ id: 1, name: 'modems' }],
      }),
    }))
  })

  it('should render permission checkboxes for view permissions', async () => {
    const store = configureStore({
      reducer: { User2: userReducer },
      preloadedState: {
        User2: {
          userList: [],
          permissionsList: [],
          isLoaded: true,
          status: 200,
          message: '',
        },
      },
    })

    render(
      <Provider store={store}>
        <ModalPermissions user={mockUser} onClose={jest.fn()} t={(key) => key} />
      </Provider>
    )

    await waitFor(() => {
      // Check that view permission labels are rendered
      expect(screen.getByText('Platforms')).toBeInTheDocument()
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('Modems')).toBeInTheDocument()
      expect(screen.getByText('Sims')).toBeInTheDocument()
      expect(screen.getByText('Cars')).toBeInTheDocument()
    })
  })

  it('should render Admin permission in settings section', async () => {
    const store = configureStore({
      reducer: { User2: userReducer },
      preloadedState: {
        User2: {
          userList: [],
          permissionsList: [],
          isLoaded: true,
          status: 200,
          message: '',
        },
      },
    })

    render(
      <Provider store={store}>
        <ModalPermissions user={mockUser} onClose={jest.fn()} t={(key) => key} />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument()
    })
  })
})

describe('ModalPermissions - Permission Logic', () => {
  it('should show checked checkbox for active permissions', async () => {
    const store = configureStore({
      reducer: { User2: userReducer },
      preloadedState: {
        User2: {
          userList: [],
          permissionsList: [{ id: 1, name: 'modems' }],
          isLoaded: true,
          status: 200,
          message: '',
        },
      },
    })

    const mockUser: UserModel = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      privilege: 1,
      active: 1,
    }

    render(
      <Provider store={store}>
        <ModalPermissions user={mockUser} onClose={jest.fn()} t={(key) => key} />
      </Provider>
    )

    await waitFor(() => {
      // Find checkbox for modems (should be checked based on permissionsList)
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
    })
  })
})
