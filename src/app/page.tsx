import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import HeroSection from '@/components/hero/HeroSection'
import ScrollProgressIndicator from '@/components/general/ScrollProgressIndicator'
import Footer from '@/components/footer/Footer'
import { ThemeProvider, ThemeToggle } from '@/components/general/GradientBackground'
import { ErrorBoundary } from '@/components/general/ErrorBoundary'

// Lazy load components with loading states
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-800/20" />,
})
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-800/20" />,
})
const JourneySection = dynamic(() => import('@/components/journey/JourneySection'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-800/20" />,
})
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), {
  loading: () => <div className="h-screen animate-pulse bg-gray-800/20" />,
})
const GradientBackground = dynamic(() => import('@/components/general/GradientBackground'), {
  ssr: false,
})

export const metadata: Metadata = {
  title: 'Shakib Howlader - Designer, Developer & ML Expert',
  description: 'Portfolio of a designer, developer, Python, and ML Expert',
  keywords: ['web developer', 'Next.js', 'Python', 'AI', 'portfolio', 'Shakib Howlader'],
  authors: [{ name: 'Shakib Howlader' }],
  alternates: {
    canonical: 'https://shakibportfolio.vercel.app/',
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="schema-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Shakib Howlader',
            url: 'https://shakibportfolio.vercel.app/',
            jobTitle: 'Web Developer',
            description: 'Web developer specializing in Next.js, Python, and Generative AI',
            knowsAbout: ['Web Development', 'Next.js', 'Python', 'Artificial Intelligence'],
            image: 'https://shakibportfolio.vercel.app//images/my_photo.png',
            sameAs: [
              'https://github.com/mr-shakib',
              'https://www.linkedin.com/in/shakib-howlader/',
            ],
          })
        }}
      />
      <main className="relative">
        <ThemeProvider>
          <ThemeToggle />
          <GradientBackground />
          <div className="relative z-10">
            <ScrollProgressIndicator />
            <ErrorBoundary>
              <HeroSection />
            </ErrorBoundary>
            
            <section className="space-y-32">
              <ErrorBoundary>
                <JourneySection />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ProjectsSection />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <SkillsSection />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <ContactSection />
              </ErrorBoundary>
            </section>
            
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </div>
        </ThemeProvider>
      </main>
    </>
  )
}