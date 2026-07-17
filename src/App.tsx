import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SubjectView from './pages/SubjectView'
import UnitView from './pages/UnitView'
import TopicReader from './pages/TopicReader'
import QuizPage from './pages/QuizPage'
import FlashcardsPage from './pages/FlashcardsPage'
import PYQPage from './pages/PYQPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/s/:subject" element={<SubjectView />} />
        <Route path="/s/:subject/u/:unit" element={<UnitView />} />
        <Route path="/s/:subject/u/:unit/t/:slug" element={<TopicReader />} />
        <Route path="/s/:subject/u/:unit/quiz" element={<QuizPage />} />
        <Route path="/s/:subject/u/:unit/cards" element={<FlashcardsPage />} />
        <Route path="/s/:subject/u/:unit/pyq" element={<PYQPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
