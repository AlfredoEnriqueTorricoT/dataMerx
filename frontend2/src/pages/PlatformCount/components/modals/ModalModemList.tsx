import React from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

interface ModalModemListProps {
  platformName: string
  modemImeiList: string[]
  isLoading: boolean
  onClose: () => void
  t: (key: string) => string
}

const ModalModemList: React.FC<ModalModemListProps> = ({
  platformName,
  modemImeiList,
  isLoading,
  onClose,
  t,
}) => {
  return (
    <>
      <ModalHeader toggle={onClose}>
        {t('Dispositivos')} - {platformName}
      </ModalHeader>
      <ModalBody>
        {isLoading ? (
          <div className="text-center py-4">
            <i className="fas fa-spinner fa-spin fa-2x"></i>
            <p className="mt-2">{t('Loading')}...</p>
          </div>
        ) : modemImeiList.length === 0 ? (
          <div className="text-center py-4">
            <i className="fas fa-inbox fa-2x text-muted"></i>
            <p className="mt-2 text-muted">{t('No data found')}</p>
          </div>
        ) : (
          <div className="grayScroll" style={{ maxHeight: '400px', overflow: 'auto' }}>
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>IMEI</th>
                </tr>
              </thead>
              <tbody>
                {modemImeiList.map((imei, index) => (
                  <tr key={`imei-${index}`}>
                    <td>{imei}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end text-muted small">
              Total: {modemImeiList.length} dispositivos
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          {t('Close')}
        </button>
      </ModalFooter>
    </>
  )
}

export default ModalModemList
