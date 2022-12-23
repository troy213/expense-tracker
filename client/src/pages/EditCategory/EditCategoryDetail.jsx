import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { editCategoryAction } from '../../store/edit-category-slice'
import { categoryDataAction } from '../../store/category-data-slice'

import { Form, Modal } from '../../components'
import { EDIT_CATEGORY_FORM } from './const'
import { checkEmptyField } from '../../utils'

const EditCategoryDetail = (props) => {
  const { item } = props

  const isGuest = JSON.parse(localStorage.getItem('isGuest'))
  const localStorageCategoryData = JSON.parse(
    localStorage.getItem('categoryData')
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')
  const editCategoryState = useSelector((state) => state.editCategory)
  const { categoryData } = useSelector((state) => state.categoryData)
  const dispatch = useDispatch()

  const handleModal = (content) => {
    if (content === 'editModal') {
      const data = localStorageCategoryData.find(
        (category) =>
          category.type === item.type && category.value === item.value
      )
      for (const field in data) {
        dispatch(
          editCategoryAction.setInputField({ field, value: data[field] })
        )
      }
    }

    setModalContent(content)
    setModalIsOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = checkEmptyField(
      editCategoryState,
      editCategoryAction,
      dispatch,
      ['error']
    )

    if (!isValid) return

    if (isGuest) {
      let data = []
      const updatedData = {
        type: editCategoryState.type,
        value: editCategoryState.value,
      }

      if (localStorageCategoryData) {
        const index = localStorageCategoryData.findIndex(
          (category) =>
            category.type === item.type && category.value === item.value
        )
        data = [
          ...localStorageCategoryData.slice(0, index),
          updatedData,
          ...localStorageCategoryData.slice(index + 1),
        ]
      } else {
        const index = categoryData.findIndex(
          (category) =>
            category.type === item.type && category.value === item.value
        )
        data = [
          ...categoryData.slice(0, index),
          updatedData,
          ...categoryData.slice(index + 1),
        ]
      }

      localStorage.setItem('categoryData', JSON.stringify(data))
      dispatch(categoryDataAction.setCategoryData({ value: data }))
      handleCancel()
    }
  }

  const handleDelete = (item) => {
    const newData = localStorageCategoryData.filter(
      (category) =>
        !(category.type === item.type && category.value === item.value)
    )
    localStorage.setItem('categoryData', JSON.stringify(newData))
    dispatch(categoryDataAction.setCategoryData({ value: newData }))
    setModalIsOpen(false)
  }

  const handleCancel = () => {
    dispatch(editCategoryAction.clearForm())
    setModalIsOpen(false)
  }

  const renderModal = {
    editModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Add Category</p>
        <Form
          schema={EDIT_CATEGORY_FORM}
          state={editCategoryState}
          action={editCategoryAction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel='Add'
        />
      </div>
    ),
    deleteModal: (
      <div className='modal__content--default'>
        <p className='text--bold'>Confirmation</p>
        <p className='text--light text--3'>
          Are you sure you want to delete this category?
        </p>
        <button
          className='btn btn-lg btn-danger'
          onClick={() => handleDelete(item)}
        >
          Delete
        </button>
        <button
          className='btn btn-lg btn-primary-outline'
          onClick={() => setModalIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    ),
  }

  return (
    <div className='edit-category__detail'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        {renderModal[modalContent]}
      </Modal>

      <p>{item.value}</p>
      <div className='edit-category__btn-wrapper'>
        <button
          className='btn btn-primary text--light'
          onClick={() => handleModal('editModal')}
        >
          Edit
        </button>
        <button
          className='btn btn-danger text--light'
          onClick={() => handleModal('deleteModal')}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default EditCategoryDetail
