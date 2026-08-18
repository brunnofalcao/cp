import AppHeader from '../../../components/AppHeader';
import AppFooter from '../../../components/AppFooter';
import NewsletterForm from '../../../components/NewsletterForm';
import {
  HeroEditorial, CredentialRail, Manifesto, DoctorProfile, MethodSteps,
  ConditionIndex, EvidencePanel, PatientJourney, ClinicGallery,
  RecentPosts, FaqAccordion, FinalCta, StickyCta
} from '../../../components/sections';
import JsonLd, { faqSchema } from '../../../components/JsonLd';
import { getDictionary } from '../../../lib/dictionaries';
import { getAllPosts } from '../../../lib/posts';

// Home original preservada em /teste durante o período "Em breve".
// Não indexar: é um preview interno, não deve aparecer no Google.
export async function generateMetadata() {
  return {
    title: 'Preview',
    robots: { index: false, follow: false }
  };
}

export default function HomeTeste({ params }) {
  const lang = params.lang === 'en' ? 'en' : 'pt';
  const dict = getDictionary(lang);
  const posts = getAllPosts(lang).slice(0, 3);

  return (
    <>
      <AppHeader lang={lang} dict={dict} currentPath="/teste" />
      <JsonLd data={faqSchema(dict.faqHome.items)} />

      <main id="main">
        <HeroEditorial lang={lang} dict={dict} />
        <CredentialRail dict={dict} />
        <Manifesto dict={dict} />
        <DoctorProfile lang={lang} dict={dict} />
        <MethodSteps dict={dict} />
        <ConditionIndex lang={lang} dict={dict} />
        <EvidencePanel dict={dict} />
        <PatientJourney dict={dict} />
        <ClinicGallery dict={dict} />
        <RecentPosts lang={lang} dict={dict} posts={posts} />
        <NewsletterForm lang={lang} dict={dict} />
        <FaqAccordion
          kicker={dict.faqHome.kicker}
          title={dict.faqHome.title}
          items={dict.faqHome.items}
          tint={false}
        />
        <FinalCta lang={lang} dict={dict} />
      </main>

      <StickyCta lang={lang} dict={dict} />
      <AppFooter lang={lang} dict={dict} />
    </>
  );
}
