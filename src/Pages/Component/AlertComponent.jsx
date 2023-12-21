
'use client'

import { useState } from 'react'
import { Alert } from 'keep-react'
import { Info } from 'phosphor-react'
import { Link } from 'react-router-dom'

const AlertComponent = () => {
    const [showAlert, setShowAlert] = useState(false)
  const onDismiss = () => {
    setShowAlert(!showAlert)
  }

  return (
    <Alert onDismiss={onDismiss} dismiss={showAlert} rounded={true} withBorder={true}>
      <Alert.Container >
        <Alert.Icon>
          <Info size={24} color="#0F3CD9" />
        </Alert.Icon>
        <Alert.Body>
          <Alert.Title>Default message - make it short</Alert.Title>
          <Alert.Description>
            Default message - Lorem Ipsum is simply dummy text of the printing and typesetting industry
            
          </Alert.Description>
        </Alert.Body>
      </Alert.Container>
    </Alert>
  )
}

export default AlertComponent;