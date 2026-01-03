import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { DropdownButton, EmptyData, THeaderSorter } from 'components/tableElements'
import { SpinnerL } from 'components/components'
import { CarModel, ModalType } from '../models/CarModel'

interface ContentTableProps {
  cars: CarModel[]
  isLoading: boolean
  onOpenModal: (type: ModalType, car?: CarModel) => void
  t: (key: string) => string
}

const ContentTable: React.FC<ContentTableProps> = ({ cars, isLoading, onOpenModal, t }) => {
  const history = useHistory()
  const [sorter, setSorter] = useState(0)

  // Sorting logic
  const sortedCars = [...cars].sort((a, b) => {
    switch (Math.abs(sorter)) {
      case 1:
        return sorter > 0
          ? a.placa.localeCompare(b.placa)
          : b.placa.localeCompare(a.placa)
      case 2:
        return sorter > 0
          ? a.mark.localeCompare(b.mark)
          : b.mark.localeCompare(a.mark)
      case 3:
        return sorter > 0
          ? a.model.localeCompare(b.model)
          : b.model.localeCompare(a.model)
      case 4:
        return sorter > 0
          ? (a.name || '').localeCompare(b.name || '')
          : (b.name || '').localeCompare(a.name || '')
      case 5:
        return sorter > 0
          ? (a.modemId || 0) - (b.modemId || 0)
          : (b.modemId || 0) - (a.modemId || 0)
      default:
        return 0
    }
  })

  if (isLoading) {
    return <SpinnerL />
  }

  return (
    <div className="grayScroll table-responsive" style={{ height: '52vh', overflow: 'auto' }}>
      <table className="table table-striped">
        <THeaderSorter
          sorter={sorter}
          setSorter={setSorter}
          headerNames={[
            { name: t('License plate'), arrow: true },
            { name: t('Mark'), arrow: true },
            { name: t('Model'), arrow: true },
            { name: t('Name'), arrow: true },
            { name: 'Módem id', arrow: true },
            { name: t('Actions'), arrow: false },
          ]}
        />
        <tbody>
          {sortedCars.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <h4 className="text-secondary text-center py-4">{t('No cars found')}</h4>
              </td>
            </tr>
          ) : (
            sortedCars.map((car) => (
              <tr key={`car-${car.id}`}>
                <td>{car.placa}</td>
                <td>{car.mark}</td>
                <td>{car.model}</td>
                <td>{car.name || <EmptyData />}</td>
                <td>{car.modemId || <EmptyData />}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn button-sm py-0"
                      title="Ver detalles"
                      onClick={() => onOpenModal('Details', car)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn button-sm mx-2 py-0"
                      title="Ver eventos"
                      onClick={() => history.push(`/car/${car.id}/events`)}
                    >
                      <i className="fas fa-tasks"></i>
                    </button>
                    <DropdownButton
                      className="btn button-sm py-0"
                      title={<i className="mdi mdi-dots-horizontal font-size-18" />}
                      buttons={[
                        {
                          title: 'Editar vehículo',
                          onClick: () => onOpenModal('Edit', car),
                        },
                        {
                          title: 'Vincular módem',
                          onClick: () => onOpenModal('Modem', car),
                        },
                        {
                          title: 'Vincular reloj',
                          onClick: () => onOpenModal('Watch', car),
                        },
                        {
                          title: 'Añadir evento',
                          onClick: () => onOpenModal('AddEvent', car),
                        },
                        {
                          title: 'Añadir imágenes',
                          onClick: () => onOpenModal('AddImages', car),
                        },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
