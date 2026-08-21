
// import React, { useState, useRef } from 'react';
// import { Navbar } from './components/Navbar';
// import { Hero } from './components/Hero';
// import { About } from './components/About';
// import { Timeline } from './components/Timeline';
// import { Projects } from './components/Projects';
// import { GitHubStats } from './components/GitHubStats';
// import { Skills } from './components/Skills';
// import { Contact } from './components/Contact';
// import { Footer } from './components/Footer';
// import { ResumeModal } from './components/Modals/ResumeModal';
// import { FormStatusModal } from './components/Modals/FormStatusModal';
// import { ThemeToggle } from './components/UI/ThemeToggle';
// import { BackToTop } from './components/UI/BackToTop';
// import { experienceData, educationData } from './data/portfolioData';

// export const App = () => {
//   const [isResumeOpen, setIsResumeOpen] = useState(false);
//   const [formModal, setFormModal] = useState({
//     isOpen: false,
//     status: 'idle', // 'loading' | 'success' | 'error'
//     message: '',
//   });

//   const abortControllerRef = useRef(null);

//   const handleCancelSubmission = () => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     setFormModal({ isOpen: false, status: 'idle', message: '' });
//   };

//   return (
//     <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
//       <Navbar onOpenResume={() => setIsResumeOpen(true)} />

//       <main className="app-container">
//         <Hero onOpenResume={() => setIsResumeOpen(true)} />
//         <About />

//         <section id="experience" style={{ padding: '60px 0' }}>
//           <div className="section-title-wrap">
//             <h2 className="section-title">Professional Experience</h2>
//             <div className="section-underline" />
//           </div>
//           <Timeline data={experienceData} id="experience-timeline" />
//         </section>

//         <section id="education" style={{ padding: '60px 0' }}>
//           <div className="section-title-wrap">
//             <h2 className="section-title">Education & Certifications</h2>
//             <div className="section-underline" />
//           </div>
//           <Timeline data={educationData} id="education-timeline" />
//         </section>

//         <Projects />
//         <GitHubStats />
//         <Skills />

//         <Contact
//           onStartSubmission={(controller) => {
//             abortControllerRef.current = controller;
//             setFormModal({ isOpen: true, status: 'loading', message: '' });
//           }}
//           onSubmissionComplete={(msg) => {
//             setFormModal({ isOpen: true, status: 'success', message: msg });
//           }}
//           onSubmissionError={(errMsg) => {
//             setFormModal({ isOpen: true, status: 'error', message: errMsg });
//           }}
//         />
//       </main>

//       <Footer />

//       {/* Modals */}
//       <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

//       <FormStatusModal
//         isOpen={formModal.isOpen}
//         status={formModal.status}
//         message={formModal.message}
//         onClose={() => setFormModal({ ...formModal, isOpen: false })}
//         onCancel={handleCancelSubmission}
//       />

//       {/* Floating Buttons */}
//       <ThemeToggle />
//       <BackToTop />
//     </div>
//   );
// };



import React, { useState, useRef, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ThemeToggle } from './components/UI/ThemeToggle';
import { experienceData, educationData } from './data/portfolioData';

// Lazy-loaded components below the fold & modals (Code Splitting)
const Timeline = lazy(() =>
  import('./components/Timeline').then((module) => ({ default: module.Timeline }))
);
const Projects = lazy(() =>
  import('./components/Projects').then((module) => ({ default: module.Projects }))
);
const GitHubStats = lazy(() =>
  import('./components/GitHubStats').then((module) => ({ default: module.GitHubStats }))
);
const Skills = lazy(() =>
  import('./components/Skills').then((module) => ({ default: module.Skills }))
);
const Contact = lazy(() =>
  import('./components/Contact').then((module) => ({ default: module.Contact }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({ default: module.Footer }))
);
const ResumeModal = lazy(() =>
  import('./components/Modals/ResumeModal').then((module) => ({ default: module.ResumeModal }))
);
const FormStatusModal = lazy(() =>
  import('./components/Modals/FormStatusModal').then((module) => ({ default: module.FormStatusModal }))
);
const BackToTop = lazy(() =>
  import('./components/UI/BackToTop').then((module) => ({ default: module.BackToTop }))
);

export const App = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [formModal, setFormModal] = useState({
    isOpen: false,
    status: 'idle', // 'loading' | 'success' | 'error'
    message: '',
  });

  const abortControllerRef = useRef(null);

  const handleCancelSubmission = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setFormModal({ isOpen: false, status: 'idle', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      <main className="app-container">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />

        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 0',
                color: 'var(--accent)',
                fontSize: '1.5rem',
              }}
            >
              <i className="bx bx-loader-alt bx-spin" />
            </div>
          }
        >
          <section id="experience" style={{ padding: '60px 0' }}>
            <div className="section-title-wrap">
              <h2 className="section-title">Professional Experience</h2>
              <div className="section-underline" />
            </div>
            <Timeline data={experienceData} id="experience-timeline" />
          </section>

          <section id="education" style={{ padding: '60px 0' }}>
            <div className="section-title-wrap">
              <h2 className="section-title">Education & Certifications</h2>
              <div className="section-underline" />
            </div>
            <Timeline data={educationData} id="education-timeline" />
          </section>

          <Projects />
          <GitHubStats />
          <Skills />

          <Contact
            onStartSubmission={(controller) => {
              abortControllerRef.current = controller;
              setFormModal({ isOpen: true, status: 'loading', message: '' });
            }}
            onSubmissionComplete={(msg) => {
              setFormModal({ isOpen: true, status: 'success', message: msg });
            }}
            onSubmissionError={(errMsg) => {
              setFormModal({ isOpen: true, status: 'error', message: errMsg });
            }}
          />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />

        {/* Modals */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        <FormStatusModal
          isOpen={formModal.isOpen}
          status={formModal.status}
          message={formModal.message}
          onClose={() => setFormModal({ ...formModal, isOpen: false })}
          onCancel={handleCancelSubmission}
        />

        {/* Floating Back to Top Button */}
        <BackToTop />
      </Suspense>

      {/* Floating Theme Switcher */}
      <ThemeToggle />
    </div>
  );
};