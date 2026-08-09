import { Container, Section, SectionHeading, ContactChannelLink, ManagerContactCard } from '@/components/ui';
import { getDirectContactPanelChannels, getManagerContact } from '@/config/contacts';
import { ContactForm } from '@/components/forms/ContactForm';
import { CallbackForm } from '@/components/forms/CallbackForm';

export function ContactsSection() {
  const directChannels = getDirectContactPanelChannels();
  const manager = getManagerContact();

  return (
    <Section id="contacts" background="warm">
      <Container>
        <SectionHeading
          title="Свяжитесь удобным способом"
          subtitle="Можно позвонить или написать напрямую — заполнять форму необязательно"
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

        <h3 className="mb-8 text-center text-xl font-semibold text-graphite">
          Нужен расчет или обратный звонок?
        </h3>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div id="contact-form">
            <h4 className="mb-4 text-lg font-semibold text-graphite">Оставить сообщение</h4>
            <ContactForm />
          </div>
          <div id="callback-form">
            <h4 className="mb-4 text-lg font-semibold text-graphite">Заказать звонок</h4>
            <CallbackForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
