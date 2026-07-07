import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar, Footer, ScrollProgressThread, CustomCursor, ScrollToTop } from './components/layout'
import { PalmBackground } from './components/palm'
import { useStore } from './lib/store'
import Home from './pages/Home'
import PalmReading from './pages/PalmReading'
import Numerology from './pages/Numerology'
import Combined from './pages/Combined'
import SampleReport from './pages/SampleReport'
import Method from './pages/Method'
import Access from './pages/Access'
import Settings from './pages/Settings'
import { Privacy, Terms } from './pages/Legal'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()
  const { prefs } = useStore()
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 paper-grain" aria-hidden="true" />
      <PalmBackground />
      <ScrollProgressThread />
      <CustomCursor enabled={prefs.cursorGlow} />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/palm" element={<PalmReading />} />
              <Route path="/numerology" element={<Numerology />} />
              <Route path="/combined" element={<Combined />} />
              <Route path="/sample" element={<SampleReport />} />
              <Route path="/method" element={<Method />} />
              <Route path="/access" element={<Access />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
