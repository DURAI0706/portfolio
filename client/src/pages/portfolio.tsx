import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import SkillsSection from '@/components/skills-section';
import ProjectsSection from '@/components/projects-section';
import ExperienceSection from '@/components/experience-section';
import SocialFeedSection from '@/components/social-feed-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Portfolio() {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <SocialFeedSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
