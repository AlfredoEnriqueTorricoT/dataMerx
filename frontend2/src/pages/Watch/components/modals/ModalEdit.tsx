import React from 'react'
import { Formik } from 'formik'
import { FormikInput } from 'components/formElements'
import { updateWatchSchema } from '../../validations'
import { WatchModel, UpdateWatchPayload } from '../../models/WatchModel'

interface ModalEditProps {
  watch: WatchModel
  onSubmit: (id: number, payload: UpdateWatchPayload) => Promise<{ success: boolean; message: string }>
  onClose: () => void
  isSubmitting: boolean
  t: (key: string) => string
}

const ModalEdit: React.FC<ModalEditProps> = ({ watch, onSubmit, onClose, isSubmitting, t }) => {
  const handleSubmit = async (values: { imei: string; modem_imei: string }) => {
    const payload: UpdateWatchPayload = {
      id: watch.id,
      imei: values.imei,
    }
    const result = await onSubmit(watch.id, payload)
    if (result.success) {
      onClose()
    }
  }

  return (
    <React.Fragment>
      <div className="modal-header">
        <h4>Editar reloj</h4>
        <button type="button" onClick={onClose} className="close" aria-label="Close"></button>
      </div>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          imei: watch.imei || '',
          modem_imei: '',
        }}
        validationSchema={updateWatchSchema}
      >
        {({ handleSubmit: formikSubmit, isSubmitting: formikIsSubmitting }) => {
          const loading = formikIsSubmitting || isSubmitting
          return (
            <>
              <div className="modal-body">
                <form id="watch_edit_form" onSubmit={formikSubmit}>
                  <FormikInput
                    label="Imei"
                    inputName="imei"
                    type="number"
                    required={true}
                    groupId="watch_edit_"
                  />
                  <FormikInput
                    label="Módem imei"
                    inputName="modem_imei"
                    type="number"
                    required={true}
                    groupId="watch_edit_"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose} disabled={loading}>
                  {t('Cancel')}
                </button>
                <div className="ms-auto">
                  <button
                    className="btn dm-button btn-label text-light"
                    disabled={loading}
                    form="watch_edit_form"
                    type="submit"
                  >
                    {loading ? 'Editando...' : 'Editar'}
                    <i className={`fas fa-${loading ? 'spinner fa-spin' : 'edit'} label-icon`}></i>
                  </button>
                </div>
              </div>
            </>
          )
        }}
      </Formik>
    </React.Fragment>
  )
}

export default ModalEdit
