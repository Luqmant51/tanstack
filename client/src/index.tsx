// index.tsx or main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx' // or './UserProfile' if rendering directly
import { FluentProvider, webLightTheme } from '@fluentui/react-components'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={webLightTheme}>
      <App />
      </FluentProvider>
    </QueryClientProvider>
)
