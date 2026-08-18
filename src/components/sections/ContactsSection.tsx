import {
  Container,
  Section,
  SectionHeading,
  ContactChannelLink,
  ManagerContactCard,
  ButtonLink,
} from '@/components/ui';
import { getDirectContactPanelChannels, getManagerContact } from '@/config/contacts';
import { getCompanyMaxHref, getCompanyPhoneHref } from '@/config/cta';

export function ContactsSection() {
  const directChannels = getDirectContactPanelChannels();
  const manager = getManagerContact();
  const maxHref = getCompanyMaxHref();
  const phoneHref = getCompanyPhoneHref();

  return (
    <Section id="contacts" background="warm">
      <Container>
        <SectionHeading
          title="Свяжитесь удобным способом"
          subtitle="Можно позвонить или написать напрямую в MAX"
          align="center"
        />

        {(directChannels.length > 0 || manager) && (
          <div className="mb-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
            {directChannels.map((channel) => (
              <ContactChannelLink key={channel.id} channel={channel} variant="card" />
            ))}
            <ManagerContactCard manager={manager} variant="panel" />
          </div>
        )}

        <div
          id="contact-form"
          className="mx-auto max-w-2xl rounded-[24px] border border-border bg-white p-6 md:p-8 text-center shadow-sm"
        >
          <h3 className="mb-3 text-xl font-semibold text-graphite">Есть вопрос по поставке?</h3>
          <p className="mb-6 text-base text-secondary-text leading-relaxed">
            Свяжитесь с нами удобным способом — ответим и уточним условия поставки.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink
              href={maxHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="green"
              size="lg"
            >
              Написать в MAX
            </ButtonLink>
            {phoneHref && (
              <ButtonLink href={phoneHref} variant="outline" size="lg">
                Позвонить
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
