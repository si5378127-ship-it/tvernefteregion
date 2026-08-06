import { Container, Section, SectionHeading, ContactChannelLink } from '@/components/ui';
import { getDirectContactPanelChannels } from '@/config/contacts';
import { ContactForm } from '@/components/forms/ContactForm';
import { CallbackForm } from '@/components/forms/CallbackForm';

export function ContactsSection() {
  const directChannels = getDirectContactPanelChannels();

  return (
    <Section id="contacts" background="warm">
      <Container>
        <SectionHeading
          title="Свяжитесь удобным способом"
          subtitle="Можно позвонить или написать напрямую — заполнять форму необязательно"
          align="center"
        />

        {directChannels.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {directChannels.map((channel) => (
              <ContactChannelLink key={channel.id} channel={channel} variant="card" />
            ))}
          </div>
        )}

        <h3 className="text-xl font-semibold text-graphite text-center mb-8">
          Нужен расчет или обратный звонок?
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div id="contact-form">
            <h4 className="text-lg font-semibold text-graphite mb-4">Оставить сообщение</h4>
            <ContactForm />
          </div>
          <div id="callback-form">
            <h4 className="text-lg font-semibold text-graphite mb-4">Заказать звонок</h4>
            <CallbackForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
