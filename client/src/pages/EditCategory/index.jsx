import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import cogoToast from 'cogo-toast'
import { addCategoryAction } from '../../store/add-category-slice'
import { categoryDataAction } from '../../store/category-data-slice'

import { Form, Modal, Spinner } from '../../components'
import EditCategoryDetail from './EditCategoryDetail'
import { ChevronLeftIcon } from '../../assets/icons'
import { getGroupedCategory } from '../../utils'
import { ADD_CATEGORY_FORM } from './const'

const EditCategory = () => {
  const isGuest = JSON.parse(localStorage.getItem('isGuest'))
  const localStorageCategoryData = JSON.parse(
    localStorage.getItem('categoryData')
  )

  const [isLoading, setIsLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const addCategoryState = useSelector((state) => state.addCategory)
  const { categoryData } = useSelector((state) => state.categoryData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isGuest && localStorageCategoryData) {
      dispatch(
        categoryDataAction.setCategoryData({ value: localStorageCategoryData })
      )
    }

    setIsLoading(false)
  }, [])

  const goBack = () => navigate('/settings')

  const handleSubmit = (e) => {
    e.preventDefault()

    let isValid = true
    const isExist = localStorageCategoryData.find(
      (item) =>
        item.type === addCategoryState.type &&
        item.value === addCategoryState.value
    )

    if (isExist) return cogoToast.error('Category is already exist')

    for (const obj in addCategoryState) {
      const EXCEPTION = ['error', 'modalValue']
      if (EXCEPTION.includes(obj)) continue

      if (!addCategoryState[obj]) {
        isValid = false
        dispatch(
          addCategoryAction.setError({
            field: `${obj}`,
            value: true,
          })
        )
      } else {
        dispatch(
          addCategoryAction.setError({
            field: `${obj}`,
            value: false,
          })
        )
      }
    }

    if (!isValid) return

    if (isGuest) {
      let data = []
      const newData = {
        type: addCategoryState.type,
        value: addCategoryState.value,
      }

      if (localStorageCategoryData) {
        data = [...localStorageCategoryData, newData]
      } else {
        data = [...categoryData, newData]
      }

      localStorage.setItem('categoryData', JSON.stringify(data))
      dispatch(categoryDataAction.setCategoryData({ value: data }))
      handleCancel()
    }
  }

  const handleCancel = () => {
    dispatch(addCategoryAction.clearForm())
    setModalIsOpen(false)
  }

  if (isLoading)
    return (
      <div className='edit-category'>
        <Spinner />
      </div>
    )

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
