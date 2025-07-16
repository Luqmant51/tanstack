import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portaladministration from './portaladministration.tsx'
import EditAdminPortalForm from './editAdminPortal/index.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portaladministration />} />
        <Route path="/portal-edit/:id" element={<EditAdminPortalForm />} />
        <Route path="/portal-create" element={<EditAdminPortalForm />} />
      </Routes>
    </Router>
  )
}

export default App
