import { Routes, Route, Navigate } from 'react-router-dom';
import { JournallPage } from '../pages/JournallPage';

export const JournalRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<JournallPage />} />
        <Route path='/*' element={<Navigate to='/'/>} />
    </Routes>
  )
}
