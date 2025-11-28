import React, { useState, useEffect, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { adminService } from '../../services/adminService'
import ConfirmationModal from '../ConfirmationModal'
import NotificationModal from '../NotificationModal'
import './ChallengesPage.css'

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingChallenge, setEditingChallenge] = useState(null)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showParticipants, setShowParticipants] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [participants, setParticipants] = useState([])
  const [loadingParticipants, setLoadingParticipants] = useState(false)
  const [winnerModal, setWinnerModal] = useState({ isOpen: false, userId: null, userName: null })
  const [endChallengeModal, setEndChallengeModal] = useState({ isOpen: false, challengeId: null })
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'info' })
  const [bannerImageFile, setBannerImageFile] = useState(null)
  const [bannerImagePreview, setBannerImagePreview] = useState(null)
  const [showCropModal, setShowCropModal] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bannerImageUrl: '',
    startDate: '',
    endDate: '',
    reward: '',
    hashtags: '',
  })

  // Fetch challenges on mount
  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    setLoading(true)
    setError('')
    try {
      // Try with default pagination (page=1, limit=50)
      const response = await adminService.getChallenges('all', 1, 50)
      console.log('Challenges response:', response)
      
      // Backend returns { challenges: [], pagination: {} }
      const challengesData = response.data?.challenges || response.challenges || []
      setChallenges(Array.isArray(challengesData) ? challengesData : [])
    } catch (err) {
      console.error('Error fetching challenges:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        responseData: err.responseData
      })
      setError(err.message || 'Failed to load challenges')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateChallenge = async (e) => {
    e.preventDefault()
    try {
      // Validate that both file and URL aren't filled
      if (bannerImageFile && formData.bannerImageUrl.trim()) {
        setNotification({ 
          isOpen: true, 
          message: 'Please use either file upload OR URL, not both. Clear one to continue.', 
          type: 'error' 
        })
        return
      }
      
      // Format dates to ISO format with time (like Postman example)
      // Date input gives YYYY-MM-DD, we need to convert to ISO format
      const startDate = formData.startDate 
        ? new Date(formData.startDate + 'T00:00:00.000Z').toISOString()
        : null
      const endDate = formData.endDate 
        ? new Date(formData.endDate + 'T23:59:59.000Z').toISOString()
        : null
      
      // Process hashtags
      const hashtagsArray = formData.hashtags
        .split(',')
        .map(tag => tag.trim().replace(/^#/, ''))
        .filter(Boolean)
      
      // Prepare challenge data - use FormData if file is present, otherwise JSON
      let challengeData
      
      if (bannerImageFile) {
        // Use FormData for file upload
        challengeData = new FormData()
        challengeData.append('title', formData.title.trim())
        challengeData.append('description', formData.description.trim() || '')
        challengeData.append('startDate', startDate)
        challengeData.append('endDate', endDate)
        // Send reward as string (backend will parse it)
        if (formData.reward.trim()) {
          challengeData.append('reward', formData.reward.trim())
        }
        if (hashtagsArray.length > 0) {
          challengeData.append('hashtags', JSON.stringify(hashtagsArray))
        }
        // Backend multer expects 'banner' field name (based on uploadChallengeBanner function)
        challengeData.append('banner', bannerImageFile)
        
        // Debug: Log FormData contents
        console.log('FormData contents:')
        for (let pair of challengeData.entries()) {
          if (pair[1] instanceof File) {
            console.log(`${pair[0]}:`, pair[1].name, pair[1].type, pair[1].size, 'bytes')
          } else {
            console.log(`${pair[0]}:`, pair[1])
          }
        }
      } else {
        // Use JSON if no file
        challengeData = {
          title: formData.title.trim(),
          description: formData.description.trim() || '',
          bannerImageUrl: formData.bannerImageUrl.trim() || null,
          startDate: startDate,
          endDate: endDate,
          reward: formData.reward.trim() || '',
        }
        if (hashtagsArray.length > 0) {
          challengeData.hashtags = hashtagsArray
        }
      }
      
      console.log('Sending challenge data:', bannerImageFile ? 'FormData with file' : challengeData)
      const response = await adminService.createChallenge(challengeData)
      const newChallenge = response.data?.challenge || response.challenge || response.data
      
      if (newChallenge) {
        setChallenges([...challenges, newChallenge])
      }
      
      setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
      setBannerImageFile(null)
      setBannerImagePreview(null)
      setShowCreateModal(false)
      await fetchChallenges() // Refresh list
    } catch (err) {
      console.error('Error creating challenge:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        responseData: err.responseData
      })
      setNotification({ isOpen: true, message: err.message || 'Failed to create challenge', type: 'error' })
    }
  }

  const handleEditChallenge = (challenge) => {
    // Format dates from ISO to YYYY-MM-DD for date inputs
    const startDate = challenge.startDate ? new Date(challenge.startDate).toISOString().split('T')[0] : ''
    const endDate = challenge.endDate ? new Date(challenge.endDate).toISOString().split('T')[0] : ''
    
    setFormData({
      title: challenge.title || '',
      description: challenge.description || '',
      bannerImageUrl: challenge.bannerImageUrl || '',
      startDate: startDate,
      endDate: endDate,
      reward: challenge.reward || '',
      hashtags: challenge.hashtags ? challenge.hashtags.join(', ') : '',
    })
    setBannerImageFile(null)
    setBannerImagePreview(challenge.bannerImageUrl || null)
    setEditingChallenge(challenge)
    setShowEditModal(true)
  }

  const handleUpdateChallenge = async (e) => {
    e.preventDefault()
    if (!editingChallenge) return

    try {
      // Validate that both file and URL aren't filled
      if (bannerImageFile && formData.bannerImageUrl.trim()) {
        setNotification({ 
          isOpen: true, 
          message: 'Please use either file upload OR URL, not both. Clear one to continue.', 
          type: 'error' 
        })
        return
      }
      
      // Format dates to ISO format with time
      const startDate = formData.startDate 
        ? new Date(formData.startDate + 'T00:00:00.000Z').toISOString()
        : null
      const endDate = formData.endDate 
        ? new Date(formData.endDate + 'T23:59:59.000Z').toISOString()
        : null
      
      // Process hashtags
      const hashtagsArray = formData.hashtags
        .split(',')
        .map(tag => tag.trim().replace(/^#/, ''))
        .filter(Boolean)
      
      // Prepare challenge data - use FormData if file is present, otherwise JSON
      let challengeData
      
      if (bannerImageFile) {
        // Use FormData for file upload
        challengeData = new FormData()
        challengeData.append('title', formData.title.trim())
        challengeData.append('description', formData.description.trim() || '')
        challengeData.append('startDate', startDate)
        challengeData.append('endDate', endDate)
        // Send reward as string (backend will parse it)
        if (formData.reward.trim()) {
          challengeData.append('reward', formData.reward.trim())
        }
        if (hashtagsArray.length > 0) {
          challengeData.append('hashtags', JSON.stringify(hashtagsArray))
        }
        // Backend multer expects 'banner' field name (based on uploadChallengeBanner function)
        challengeData.append('banner', bannerImageFile)
        
        // Debug: Log FormData contents
        console.log('FormData contents:')
        for (let pair of challengeData.entries()) {
          if (pair[1] instanceof File) {
            console.log(`${pair[0]}:`, pair[1].name, pair[1].type, pair[1].size, 'bytes')
          } else {
            console.log(`${pair[0]}:`, pair[1])
          }
        }
      } else {
        // Use JSON if no file
        challengeData = {
          title: formData.title.trim(),
          description: formData.description.trim() || '',
          bannerImageUrl: formData.bannerImageUrl.trim() || null,
          startDate: startDate,
          endDate: endDate,
          reward: formData.reward.trim() || '',
        }
        if (hashtagsArray.length > 0) {
          challengeData.hashtags = hashtagsArray
        }
      }
      
      console.log('Updating challenge:', editingChallenge.id, bannerImageFile ? 'FormData with file' : challengeData)
      await adminService.updateChallenge(editingChallenge.id, challengeData)
      
      setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
      setBannerImageFile(null)
      setBannerImagePreview(null)
      setShowEditModal(false)
      setEditingChallenge(null)
      await fetchChallenges() // Refresh list
    } catch (err) {
      console.error('Error updating challenge:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        responseData: err.responseData
      })
      setNotification({ isOpen: true, message: err.message || 'Failed to update challenge', type: 'error' })
    }
  }

  const handleSelectWinner = async (challengeId) => {
    setSelectedChallenge(challengeId)
    setLoadingParticipants(true)
    try {
      const response = await adminService.getChallengeParticipants(challengeId)
      // The entries endpoint returns entries array
      const entries = response.data?.entries || response.entries || []
      setParticipants(Array.isArray(entries) ? entries : [])
      setShowWinnerModal(true)
    } catch (err) {
      console.error('Error fetching participants:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to load participants', type: 'error' })
    } finally {
      setLoadingParticipants(false)
    }
  }

  const handleConfirmWinner = (userId, userName) => {
    setWinnerModal({ isOpen: true, userId, userName })
  }

  const confirmWinner = async () => {
    const { userId, userName } = winnerModal
    setWinnerModal({ isOpen: false, userId: null, userName: null })

    try {
      console.log('Selecting winner:', selectedChallenge, userId)
      const response = await adminService.selectChallengeWinner(selectedChallenge, userId)
      console.log('Winner selected response:', response)
      
      const message = response.data?.message || response.message || `Successfully selected ${userName} as the winner!`
      setNotification({ isOpen: true, message, type: 'success' })
      
      // Refresh challenges to show updated winner
      await fetchChallenges()
      
      // Close modal and reset state
      setShowWinnerModal(false)
      setSelectedChallenge(null)
      setParticipants([])
    } catch (err) {
      console.error('Error selecting winner:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        responseData: err.responseData
      })
      const errorMsg = err.responseData?.data?.message || err.responseData?.message || err.message || 'Failed to select winner'
      setNotification({ isOpen: true, message: errorMsg, type: 'error' })
    }
  }

  const handleEndChallenge = (challengeId) => {
    setEndChallengeModal({ isOpen: true, challengeId })
  }

  const endChallenge = async () => {
    const { challengeId } = endChallengeModal
    setEndChallengeModal({ isOpen: false, challengeId: null })
    
    try {
      console.log('Ending challenge:', challengeId)
      const response = await adminService.endChallenge(challengeId)
      console.log('Challenge ended response:', response)
      
      const message = response.data?.message || response.message || 'Challenge ended successfully!'
      setNotification({ isOpen: true, message, type: 'success' })
      
      // Refresh challenges to show updated status
      await fetchChallenges()
    } catch (err) {
      console.error('Error ending challenge:', err)
      console.error('Error details:', {
        message: err.message,
        status: err.status,
        responseData: err.responseData
      })
      const errorMsg = err.responseData?.data?.message || err.responseData?.message || err.message || 'Failed to end challenge'
      setNotification({ isOpen: true, message: errorMsg, type: 'error' })
    }
  }

  const loadParticipants = async (challengeId) => {
    setSelectedChallenge(challengeId)
    setLoadingParticipants(true)
    try {
      const response = await adminService.getChallengeParticipants(challengeId)
      // The entries endpoint returns entries array
      const entries = response.data?.entries || response.entries || []
      setParticipants(Array.isArray(entries) ? entries : [])
      setShowParticipants(true)
    } catch (err) {
      console.error('Error fetching participants:', err)
      setNotification({ isOpen: true, message: err.message || 'Failed to load participants', type: 'error' })
    } finally {
      setLoadingParticipants(false)
    }
  }

  // Image cropping functions
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.src = url
    })

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

    canvas.width = safeArea
    canvas.height = safeArea

    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.translate(-safeArea / 2, -safeArea / 2)

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    )

    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        resolve(blob)
      }, 'image/jpeg')
    })
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropComplete = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      const file = new File([croppedImage], 'banner.jpg', { type: 'image/jpeg' })
      setBannerImageFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      setShowCropModal(false)
      setImageSrc(null)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
    } catch (error) {
      console.error('Error cropping image:', error)
      setNotification({ isOpen: true, message: 'Failed to crop image', type: 'error' })
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
        setShowCropModal(true)
        setFormData({ ...formData, bannerImageUrl: '' }) // Clear URL when file is selected
      }
      reader.readAsDataURL(file)
    } else {
      setBannerImageFile(null)
      setBannerImagePreview(null)
    }
  }

  return (
    <div className="challenges-page">
      <div className="page-header">
        <h1 className="page-title">Challenges</h1>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Challenge
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '16px', 
          background: '#ffebee', 
          color: '#c62828', 
          borderRadius: '8px', 
          marginBottom: '24px' 
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading challenges...
        </div>
      ) : challenges.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No challenges found. Create your first challenge!
        </div>
      ) : (
        <div className="challenges-grid">
          {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card">
            <div className="challenge-header">
              <h3 className="challenge-title">{challenge.title}</h3>
              <span className={`status-badge ${challenge.status || (challenge.endDate && new Date(challenge.endDate) < new Date() ? 'ended' : 'active')}`}>
                {challenge.status || (challenge.endDate && new Date(challenge.endDate) < new Date() ? 'ended' : 'active')}
              </span>
            </div>
            <p className="challenge-description">{challenge.description}</p>
            <div className="challenge-meta">
              <div className="meta-item">
                <span className="meta-label">Start:</span>
                <span className="meta-value">
                  {new Date(challenge.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">End:</span>
                <span className="meta-value">
                  {new Date(challenge.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Participants:</span>
                <span className="meta-value">
                  {challenge.participants || challenge.participantsCount || 0}
                </span>
              </div>
              {challenge.winner && (
                <div className="meta-item">
                  <span className="meta-label">Winner:</span>
                  <span className="meta-value winner">
                    {challenge.winner?.fullName || challenge.winner?.name || challenge.winner || 'N/A'}
                  </span>
                </div>
              )}
            </div>
            <div className="challenge-actions">
              <button
                className="btn-secondary"
                onClick={() => loadParticipants(challenge.id)}
                disabled={loadingParticipants}
              >
                View Participants
              </button>
              <button
                className="btn-secondary"
                onClick={() => handleEditChallenge(challenge)}
              >
                Edit
              </button>
              {(challenge.status === 'active' || (!challenge.status && challenge.endDate && new Date(challenge.endDate) >= new Date())) && (
                <button
                  className="btn-warning"
                  onClick={() => handleEndChallenge(challenge.id)}
                >
                  End Challenge
                </button>
              )}
              {(challenge.status === 'ended' || (challenge.endDate && new Date(challenge.endDate) < new Date())) && !challenge.winner && (
                <button
                  className="btn-success"
                  onClick={() => handleSelectWinner(challenge.id)}
                >
                  Select Winner
                </button>
              )}
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => {
          setShowCreateModal(false)
          setBannerImageFile(null)
          setBannerImagePreview(null)
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Challenge</h2>
              <button className="modal-close" onClick={() => {
                setShowCreateModal(false)
                setBannerImageFile(null)
                setBannerImagePreview(null)
              }}>×</button>
            </div>
            <form onSubmit={handleCreateChallenge} className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!!formData.bannerImageUrl.trim()}
                  onChange={handleFileSelect}
                />
                {bannerImagePreview && (
                  <div style={{ marginTop: '12px', position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={bannerImagePreview} 
                      alt="Banner preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e0e0e0'
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                        // Reset file input
                        const fileInput = document.querySelector('input[type="file"]')
                        if (fileInput) fileInput.value = ''
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear image"
                    >
                      ×
                    </button>
                  </div>
                )}
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {formData.bannerImageUrl.trim() 
                    ? 'URL entered. Clear URL to upload a file instead.' 
                    : 'Optional: Upload a banner image for this challenge'}
                </small>
              </div>
              <div className="form-group">
                <label>Banner Image URL (Alternative)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    value={formData.bannerImageUrl}
                    onChange={(e) => {
                      const url = e.target.value
                      if (url.trim()) {
                        // Clear file when URL is entered
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                      }
                      setFormData({ ...formData, bannerImageUrl: url })
                    }}
                    placeholder="https://example.com/image.png"
                    disabled={!!bannerImageFile}
                    style={{ paddingRight: formData.bannerImageUrl.trim() ? '40px' : '12px' }}
                  />
                  {formData.bannerImageUrl.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, bannerImageUrl: '' })
                      }}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        fontSize: '24px',
                        lineHeight: '1',
                        padding: '0',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear URL"
                    >
                      ×
                    </button>
                  )}
                </div>
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {bannerImageFile 
                    ? 'File upload selected. Clear file to use URL instead.' 
                    : 'Optional: Provide a URL instead of uploading a file'}
                </small>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reward</label>
                <input
                  type="text"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  placeholder="e.g., $500 Gift Card + Featured on Homepage"
                />
              </div>
              <div className="form-group">
                <label>Hashtags (comma separated)</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="#summer #fashion"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Create Challenge</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Challenge Modal */}
      {showEditModal && editingChallenge && (
        <div className="modal-overlay" onClick={() => {
          setShowEditModal(false)
          setEditingChallenge(null)
          setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
          setBannerImageFile(null)
          setBannerImagePreview(null)
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Challenge</h2>
              <button className="modal-close" onClick={() => {
                setShowEditModal(false)
                setEditingChallenge(null)
                setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
                setBannerImageFile(null)
                setBannerImagePreview(null)
              }}>×</button>
            </div>
            <form onSubmit={handleUpdateChallenge} className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!!formData.bannerImageUrl.trim()}
                  onChange={handleFileSelect}
                />
                {bannerImagePreview && (
                  <div style={{ marginTop: '12px', position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={bannerImagePreview} 
                      alt="Banner preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e0e0e0'
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                        // Reset file input
                        const fileInput = document.querySelector('input[type="file"]')
                        if (fileInput) fileInput.value = ''
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear image"
                    >
                      ×
                    </button>
                  </div>
                )}
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {formData.bannerImageUrl.trim() 
                    ? 'URL entered. Clear URL to upload a file instead.' 
                    : 'Optional: Upload a banner image for this challenge'}
                </small>
              </div>
              <div className="form-group">
                <label>Banner Image URL (Alternative)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    value={formData.bannerImageUrl}
                    onChange={(e) => {
                      const url = e.target.value
                      if (url.trim()) {
                        // Clear file when URL is entered
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                      }
                      setFormData({ ...formData, bannerImageUrl: url })
                    }}
                    placeholder="https://example.com/image.png"
                    disabled={!!bannerImageFile}
                    style={{ paddingRight: formData.bannerImageUrl.trim() ? '40px' : '12px' }}
                  />
                  {formData.bannerImageUrl.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, bannerImageUrl: '' })
                      }}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        fontSize: '24px',
                        lineHeight: '1',
                        padding: '0',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear URL"
                    >
                      ×
                    </button>
                  )}
                </div>
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {bannerImageFile 
                    ? 'File upload selected. Clear file to use URL instead.' 
                    : 'Optional: Provide a URL instead of uploading a file'}
                </small>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reward</label>
                <input
                  type="text"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  placeholder="e.g., $500 Gift Card + Featured on Homepage"
                />
              </div>
              <div className="form-group">
                <label>Hashtags (comma separated)</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="#summer #fashion"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Create Challenge</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Challenge Modal */}
      {showEditModal && editingChallenge && (
        <div className="modal-overlay" onClick={() => {
          setShowEditModal(false)
          setEditingChallenge(null)
          setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
          setBannerImageFile(null)
          setBannerImagePreview(null)
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Challenge</h2>
              <button className="modal-close" onClick={() => {
                setShowEditModal(false)
                setEditingChallenge(null)
                setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
                setBannerImageFile(null)
                setBannerImagePreview(null)
              }}>×</button>
            </div>
            <form onSubmit={handleUpdateChallenge} className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label>Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={!!formData.bannerImageUrl.trim()}
                  onChange={handleFileSelect}
                />
                {bannerImagePreview && (
                  <div style={{ marginTop: '12px', position: 'relative', display: 'inline-block' }}>
                    <img 
                      src={bannerImagePreview} 
                      alt="Banner preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        borderRadius: '8px',
                        border: '2px solid #e0e0e0'
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                        // Reset file input
                        const fileInput = document.querySelector('input[type="file"]')
                        if (fileInput) fileInput.value = ''
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear image"
                    >
                      ×
                    </button>
                  </div>
                )}
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {formData.bannerImageUrl.trim() 
                    ? 'URL entered. Clear URL to upload a file instead.' 
                    : 'Optional: Upload a banner image for this challenge'}
                </small>
              </div>
              <div className="form-group">
                <label>Banner Image URL (Alternative)</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    value={formData.bannerImageUrl}
                    onChange={(e) => {
                      const url = e.target.value
                      if (url.trim()) {
                        // Clear file when URL is entered
                        setBannerImageFile(null)
                        setBannerImagePreview(null)
                      }
                      setFormData({ ...formData, bannerImageUrl: url })
                    }}
                    placeholder="https://example.com/image.png"
                    disabled={!!bannerImageFile}
                    style={{ paddingRight: formData.bannerImageUrl.trim() ? '40px' : '12px' }}
                  />
                  {formData.bannerImageUrl.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, bannerImageUrl: '' })
                      }}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#999',
                        cursor: 'pointer',
                        fontSize: '24px',
                        lineHeight: '1',
                        padding: '0',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}
                      title="Clear URL"
                    >
                      ×
                    </button>
                  )}
                </div>
                <small style={{ fontSize: '12px', color: '#666', marginTop: '4px', display: 'block' }}>
                  {bannerImageFile 
                    ? 'File upload selected. Clear file to use URL instead.' 
                    : 'Optional: Provide a URL instead of uploading a file'}
                </small>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Reward</label>
                <input
                  type="text"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  placeholder="e.g., $500 Gift Card + Featured on Homepage"
                />
              </div>
              <div className="form-group">
                <label>Hashtags (comma separated)</label>
                <input
                  type="text"
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  placeholder="#summer #fashion"
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingChallenge(null)
                    setFormData({ title: '', description: '', bannerImageUrl: '', startDate: '', endDate: '', reward: '', hashtags: '' })
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">Update Challenge</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants Modal */}
      {showParticipants && (
        <div className="modal-overlay" onClick={() => setShowParticipants(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Challenge Participants</h2>
              <button className="modal-close" onClick={() => setShowParticipants(false)}>×</button>
            </div>
            <div className="modal-body">
              {loadingParticipants ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  Loading participants...
                </div>
              ) : participants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No participants found
                </div>
              ) : (
                <div className="participants-list">
                  {participants.map((entry) => {
                    // Entry format from backend: { id, user: { id, fullName, username, ... }, post: { id, likesCount, ... } }
                    const user = entry.user || entry
                    const post = entry.post || {}
                    const name = user.fullName || user.full_name || user.name || 'Unknown'
                    const username = user.username ? `@${user.username}` : 'unknown'
                    const votes = post.likesCount || post.likes_count || 0
                    return (
                    <div key={entry.id || user.id} className="participant-item">
                      <div className="participant-info">
                        <div className="participant-avatar">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="participant-name">{name}</div>
                          <div className="participant-username">{username}</div>
                        </div>
                      </div>
                      <div className="participant-stats">
                        <span className="stat">Votes: {votes}</span>
                      </div>
                    </div>
                  )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Select Winner Modal */}
      {showWinnerModal && (
        <div className="modal-overlay" onClick={() => setShowWinnerModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Select Winner</h2>
              <button className="modal-close" onClick={() => setShowWinnerModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-description">Click on a participant below to select them as the winner:</p>
              {loadingParticipants ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  Loading participants...
                </div>
              ) : participants.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                  No participants found
                </div>
              ) : (
                <div className="participants-list">
                  {participants.map((entry) => {
                    // Entry format from backend: { id, user: { id, fullName, username, ... }, post: { id, ... } }
                    const user = entry.user || entry
                    const userId = user.id || entry.userId || entry.user_id
                    const name = user.fullName || user.full_name || user.name || 'Unknown'
                    const username = user.username ? `@${user.username}` : 'unknown'
                    const post = entry.post || {}
                    const votes = post.likesCount || post.likes_count || 0
                    return (
                      <div
                        key={entry.id || userId}
                        className="participant-item selectable"
                        onClick={() => {
                          if (userId) {
                            handleConfirmWinner(userId, name)
                          } else {
                            setNotification({ isOpen: true, message: 'Unable to select winner: User ID not found', type: 'error' })
                          }
                        }}
                      >
                        <div className="participant-info">
                          <div className="participant-avatar">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="participant-name">{name}</div>
                            <div className="participant-username">{username}</div>
                          </div>
                        </div>
                        <div className="participant-stats">
                          <span className="stat">Votes: {votes}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              <div style={{ marginTop: '16px', padding: '12px', background: '#e3f2fd', borderRadius: '8px', fontSize: '14px', color: '#1976d2' }}>
                💡 Tip: Click on any participant above to select them as the winner.
              </div>
            </div>
          </div>
        </div>
      )}
      <ConfirmationModal
        isOpen={winnerModal.isOpen}
        onClose={() => setWinnerModal({ isOpen: false, userId: null, userName: null })}
        onConfirm={confirmWinner}
        title="Select Winner"
        message={`Are you sure you want to select ${winnerModal.userName} as the winner? This action cannot be undone.`}
        confirmText="Select Winner"
        cancelText="Cancel"
        type="default"
      />
      <ConfirmationModal
        isOpen={endChallengeModal.isOpen}
        onClose={() => setEndChallengeModal({ isOpen: false, challengeId: null })}
        onConfirm={endChallenge}
        title="End Challenge"
        message="Are you sure you want to end this challenge? Once ended, you will be able to select a winner."
        confirmText="End Challenge"
        cancelText="Cancel"
        type="warning"
      />
      {/* Image Crop Modal */}
      {showCropModal && imageSrc && (
        <div className="modal-overlay" onClick={() => {
          setShowCropModal(false)
          setImageSrc(null)
          setCrop({ x: 0, y: 0 })
          setZoom(1)
          setCroppedAreaPixels(null)
        }}>
          <div className="modal-content" style={{ maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Crop Banner Image</h2>
              <button className="modal-close" onClick={() => {
                setShowCropModal(false)
                setImageSrc(null)
                setCrop({ x: 0, y: 0 })
                setZoom(1)
                setCroppedAreaPixels(null)
              }}>×</button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '400px', 
                background: '#000',
                marginBottom: '20px'
              }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Zoom: {Math.round(zoom * 100)}%
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => {
                    setShowCropModal(false)
                    setImageSrc(null)
                    setCrop({ x: 0, y: 0 })
                    setZoom(1)
                    setCroppedAreaPixels(null)
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn-primary" 
                  onClick={handleCropComplete}
                >
                  Crop & Use Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => setNotification({ isOpen: false, message: '', type: 'info' })}
        message={notification.message}
        type={notification.type}
      />
    </div>
  )
}

export default ChallengesPage

