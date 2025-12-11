# CLAUDE.md - Guía de Desarrollo Frontend DataMerx

## Estructura de Módulos (Patrón Watch)

El módulo Watch sirve como referencia para crear nuevas páginas CRUD. Sigue una arquitectura modular con separación clara de responsabilidades.

### Estructura de Carpetas

```
src/pages/[NombreModulo]/
├── index.tsx                    # Página principal
├── components/
│   ├── Header.tsx               # Barra de búsqueda y botón agregar
│   ├── ContentTable.tsx         # Tabla con datos y acciones
│   └── modals/
│       ├── ModalIndex.tsx       # Controlador de modales
│       ├── ModalAdd.tsx         # Modal para crear
│       ├── ModalEdit.tsx        # Modal para editar
│       ├── ModalDelete.tsx      # Modal para eliminar
│       └── ModalSettings.tsx    # Modal para configuración (opcional)
├── hooks/
│   ├── index.ts                 # Barrel export
│   ├── use[Modulo].ts           # Hook de estado (lectura de Redux)
│   └── use[Modulo]Fetch.ts      # Hook de operaciones async (CRUD)
├── models/
│   └── [Modulo]Model.ts         # Tipos, interfaces y DTOs
├── services/
│   ├── I[Modulo]Service.ts      # Interfaz del servicio
│   └── [Modulo]ApiService.ts    # Implementación con httpRequestWithAuth
├── adapters/
│   └── [modulo]Adapter.ts       # Transformación snake_case <-> camelCase
├── slices/
│   └── [modulo]Slice.ts         # Redux Toolkit slice (solo datos)
└── validations/
    └── index.ts                 # Esquemas Yup para formularios
```

### Archivos Compartidos

```
src/shared/
├── types/
│   └── index.ts                 # ApiResponse, SetStateFn, etc.
└── utils/
    └── httpService.ts           # httpRequest, httpRequestWithAuth, transformApiData
```

---

## Patrones de Implementación

### 1. Modelo (`models/[Modulo]Model.ts`)

```typescript
// Tipos de UI compartidos
export type ModalType = 'Add' | 'Edit' | 'Delete' | 'Settings' | 'Details'
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalState {
  open: boolean
  type: ModalType
  size: ModalSize
}

// Modelo UI (camelCase)
export interface [Modulo]Model {
  id: number
  // ... propiedades en camelCase
}

// Respuesta API (snake_case)
export interface [Modulo]ApiResponse {
  id: number
  // ... propiedades en snake_case
}

// Payloads para API (snake_case)
export interface Create[Modulo]Payload { ... }
export interface Update[Modulo]Payload { ... }
```

### 2. Adapter (`adapters/[modulo]Adapter.ts`)

```typescript
export const adapt[Modulo]ResponseToModel = (data: [Modulo]ApiResponse): [Modulo]Model => ({
  id: data.id,
  propertyName: data.property_name,
  // snake_case -> camelCase
})

export const adapt[Modulo]ListResponseToModel = (data: [Modulo]ApiResponse[]): [Modulo]Model[] =>
  data.map(adapt[Modulo]ResponseToModel)
```

### 3. Servicio (`services/[Modulo]ApiService.ts`)

```typescript
export class [Modulo]ApiService implements I[Modulo]Service {
  async getAll(setLoading?: SetStateFn): Promise<ApiResponse<[Modulo]Model[]>> {
    const res = await httpRequestWithAuth.get<{ data: [Modulo]ApiResponse[] }>(
      '[endpoint]',
      setLoading
    )
    return transformApiData(res, (data) => adapt[Modulo]ListResponseToModel(data.data || []))
  }

  async create(payload: Create[Modulo]Payload, setLoading?: SetStateFn): Promise<ApiResponse<[Modulo]Model>> {
    const res = await httpRequestWithAuth.post<{ data: [Modulo]ApiResponse }>(
      '[endpoint]',
      payload,
      setLoading
    )
    return transformApiData(res, (data) => adapt[Modulo]ResponseToModel(data.data))
  }

  // update, delete, etc.
}
```

### 4. Slice (`slices/[modulo]Slice.ts`)

```typescript
interface [Modulo]State {
  [modulo]List: [Modulo]Model[]
  status: number
  message: string
}

const [modulo]Slice = createSlice({
  name: '[modulo]',
  initialState,
  reducers: {
    set[Modulo]List: (state, action: PayloadAction<[Modulo]Model[]>) => {
      state.[modulo]List = action.payload
    },
    add[Modulo]: (state, action: PayloadAction<[Modulo]Model>) => {
      state.[modulo]List.push(action.payload)
    },
    update[Modulo]InList: (state, action: PayloadAction<[Modulo]Model>) => {
      const index = state.[modulo]List.findIndex((item) => item.id === action.payload.id)
      if (index !== -1) state.[modulo]List[index] = action.payload
    },
    remove[Modulo]: (state, action: PayloadAction<number>) => {
      state.[modulo]List = state.[modulo]List.filter((item) => item.id !== action.payload)
    },
  },
})
```

### 5. Hook de Estado (`hooks/use[Modulo].ts`)

```typescript
export const use[Modulo] = () => {
  const state = useSelector((state: RootState) => state.[Modulo])

  return {
    items: state.[modulo]List,
    status: state.status,
    message: state.message,
    // Helpers opcionales
    getById: (id: number) => state.[modulo]List.find((item) => item.id === id),
  }
}
```

### 6. Hook de Fetch (`hooks/use[Modulo]Fetch.ts`)

```typescript
export const use[Modulo]Fetch = () => {
  const [isLoading, setIsLoading] = useState(true)  // true para mostrar loader inicial
  const dispatch = useDispatch()
  const service = useMemo(() => new [Modulo]ApiService(), [])

  const fetchAll = async () => {
    const result = await service.getAll(setIsLoading)
    if (result.data) dispatch(set[Modulo]List(result.data))
    return { success: result.status === 200, message: result.message }
  }

  const create = async (payload) => {
    const result = await service.create(payload, setIsLoading)
    if (result.data) dispatch(add[Modulo](result.data))  // Actualiza Redux directamente
    return { success: result.status === 200 || result.status === 201, message: result.message }
  }

  // update, delete - actualizan Redux directamente, sin recargar todo

  return { isLoading, fetchAll, create, update, delete: remove }
}
```

### 7. Página Principal (`index.tsx`)

```typescript
const [Modulo]Page: React.FC = () => {
  const { items } = use[Modulo]()
  const { isLoading, fetchAll, create, update, delete: remove } = use[Modulo]Fetch()

  // Estado local de UI (no Redux)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<[Modulo]Model | null>(null)
  const [modalState, setModalState] = useState<ModalState>({ open: false, type: 'Add', size: 'md' })

  useEffect(() => {
    fetchAll()
  }, [])

  // Filtrado local
  const filteredItems = items.filter((item) => /* lógica de filtro */)

  // Handlers de modal y CRUD...
}
```

### 8. Modales con Formik

```typescript
<Formik onSubmit={handleSubmit} initialValues={...} validationSchema={schema}>
  {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
    const loading = formikIsSubmitting || isSubmitting
    return (
      <>
        <div className="modal-body">
          <form id="[modulo]_form" onSubmit={formikSubmit}>
            <FormikInput label="..." inputName="..." />
          </form>
        </div>
        <div className="modal-footer">
          <button disabled={loading}>Cancelar</button>
          <button form="[modulo]_form" type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
            <i className={`fas fa-${loading ? 'spinner fa-spin' : 'save'} label-icon`}></i>
          </button>
        </div>
      </>
    )
  }}
</Formik>
```

---

## Convenciones

### Nombres
- **Modelos UI**: camelCase (`deviceName`, `platformId`)
- **API/Payloads**: snake_case (`device_name`, `platform_id`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Slice name**: minúsculas (`'watch'`, `'modem'`)

### Estado
- **Redux**: Solo datos de lista y status
- **Local**: Modal state, selectedItem, searchTerm

### Loading
- `useState(true)` en hook fetch para mostrar loader al montar
- `httpRequestWithAuth` maneja `setLoading` automáticamente
- Iconos: `fas fa-spinner fa-spin` (Font Awesome, no BoxIcons)

### CRUD sin recarga
- Create: `dispatch(add[Modulo](result.data))`
- Update: `dispatch(update[Modulo]InList(result.data))`
- Delete: `dispatch(remove[Modulo](id))`
- NO llamar `fetchAll()` después de operaciones CRUD

---

## Registro en Store

```typescript
// src/store/reducers.js
import watchReducer from '../pages/Watch/slices/watchSlice'

const rootReducer = combineReducers({
  Watch: watchReducer,
  // ... otros reducers
})
```

---

## Componentes Reutilizables

- `FormikInput`, `FormikSelect` - Inputs con Formik
- `THeaderSorter` - Headers de tabla ordenables
- `Breadcrumbs` - Navegación
- `showToast` - Notificaciones

---

## Ejemplo de Referencia

Ver implementación completa en: `src/pages/Watch/`
