import ContactForm from '@/app/_components/ContactForm/ContactForm'
import ContactHeader from '@/app/_components/ContactHeader/ContactHeader'
import ContactInfo from '@/app/_components/ContactInfo/ContactInfo'

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <ContactInfo /> </div> <div className="lg:col-span-2">
            <ContactForm /> </div> </div>

      </section></>

  )
}
