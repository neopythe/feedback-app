import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback
  const fetchFeedback = async () => {
    const response = await axios.get('/feedback?_sort=id&_order=desc')
    setFeedback(response.data)
    setIsLoading(false)
  }

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await axios.post(
      '/feedback',
      JSON.stringify(newFeedback),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    setFeedback([response.data, ...feedback])
  }

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await axios.delete(`/feedback/${id}`)

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  // update feedback item
  const updateFeedback = async (id, item, updatedItem) => {
    const response = await axios.put(
      `/feedback/${id}`,
      JSON.stringify(updatedItem),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )

    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...response.data } : item
      )
    )
    setFeedbackEdit({
      item,
      edit: false,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
