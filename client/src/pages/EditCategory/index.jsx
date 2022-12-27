import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cogoToast from 'cogo-toast'
import { addCategoryAction } from '../../store/add-category-slice'
import { categoryDataAction } from '../../store/category-data-slice'

import { Form, Modal, Spinner } from '../../components'
import EditCategoryDetail from './EditCategoryDetail'
import { ChevronLeftIcon } from '../../assets/icons'
import { getGroupedCategory, checkEmptyField } from '../../utils'
import { ADD_CATEGORY_FORM } from './const'
import useAuth from '../../hooks/useAuth'
import useStorage from '../../hooks/useStorage'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const EditCategory = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const addCategoryState = useSelector((state) => state.addCategory)
  const { categoryData } = useSelector((state) => state.categoryData)
  const { auth } = useAuth()
  const { setStorageCategoryData } = useStorage()
  const axiosPrivate = useAxiosPrivate()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goBack = () => navigate('/settings')

  const handleSubmit = (e) => {
    e.preventDefault()

    const isExist = categoryData.find(
      (item) =>
        item.type === addCategoryState.type &&
        item.value === addCategoryState.value
    )

    if (isExist) return cogoToast.error('Category is already exist')

    const isValid = checkEmptyField(
      addCategoryState,
      addCategoryAction,
      dispatch,
      ['error']
    )

    if (!isValid) return

    const newData = {
      type: addCategoryState.type,
      value: addCategoryState.value,
    }

    if (auth?.id === 'guest') {
      const data = [...categoryData, newData]

      setStorageCategoryData(data)
    } else {
      submitForm(newData)
    }
    handleCancel()
  }

  const submitForm = async (data) => {
    data.userId = auth.id
    try {
      const response = await axiosPrivate.post(
        '/api/category',
        JSON.stringify(data)
      )
      dispatch(
        categoryDataAction.setCategoryData({
          value: [...categoryData, data],
        })
      )
    } catch (err) {
      if (!err?.response) {
        cogoToast.error('No Server Response')
      } else {
        cogoToast.error(err.response?.data?.message)
      }
    }
  }

  const handleCancel = () => {
    dispatch(addCategoryAction.clearForm())
    setModalIsOpen(false)
  }

  return (
    <section className='edit-category'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p className='text--bold'>Add Category</p>
          <Form
            schema={ADD_CATEGORY_FORM}
            state={addCategoryState}
            action={addCategoryAction}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel='Add'
          />
        </div>
      </Modal>

      <div className='edit-category__header'>
        <button
          className='edit-category__header-wrapper btn-link'
          onClick={goBack}
        >
          <ChevronLeftIcon />
          <p className='text--bold'>Edit Category</p>
        </button>
      </div>
      <button
        className='btn btn-lg btn-primary text--bold mt-4'
        onClick={() => setModalIsOpen(true)}
      >
        Add Category
      </button>

      <div className='edit-category__content'>
        {categoryData.length ? (
          <>
            {getGroupedCategory(categoryData).map((category, index) => {
              const { type, data } = category

              return (
                <div className='edit-category__detail-wrapper mt-4' key={index}>
                  <p className='text--bold'>{type}</p>

                  {data.map((item, index) => {
                    return <EditCategoryDetail item={item} key={index} />
                  })}
                </div>
              )
            })}
          </>
        ) : (
          <div className='edit-category__empty'>
            <p className='text--light'>There is no data</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default EditCategory
