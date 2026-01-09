import './App.module.scss'
import styles from './App.module.scss'
import HeroSection from './components/HeroSection'
import MobileStructionSection from './components/MobileStructionSection'
import StructionSection from './components/StructionSection'
import EventSection from './components/EventSection'
import MobileFAQSection from './components/MobileFAQSection'
import FAQSection from './components/FAQSection'
import NoteSection from './components/NoteSection'
import Nav from './components/Nav'
import Footer from './components/Footer'
import DecoWaveReverse from './assets/deco-wave-bottom.png'
import MobileDecoWaveReverse from "./assets/mobile-deco-wave-bottom.png";
import DecoRing from './assets/deco-ring-2.png';
import FloatingButtons from './components/FloatingButtons'
import { useMedia } from 'react-use'

function App() {
  const isMobile = useMedia('(max-width: 768px)')
  const isPad = useMedia('(max-width: 1280px)')

  return (
      <div className={styles.app}>
          <Nav />
          <HeroSection />
          <div className={styles.blocksContainer}>
              <img src={DecoWaveReverse} className={styles.waveReverse} />
              <img src={MobileDecoWaveReverse} className={styles.mobileWaveReverse} />
              <img src={DecoRing} className={styles.ring} />
              
              {isPad ? <MobileStructionSection /> : <StructionSection />}
              <EventSection />
              {isMobile ? <MobileFAQSection /> : <FAQSection />}
              
          </div>
          <NoteSection />
          <Footer />
          <FloatingButtons />
      </div>
  );
}

export default App
