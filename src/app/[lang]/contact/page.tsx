import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getDictionary, hasLocale } from "../dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header lang={lang} dict={{ nav: dict.nav }} />
      <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          {dict.contactPage.heading}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          {dict.contactPage.subtitle}
        </Typography>
        <ContactForm dict={dict.contactPage.form} />
      </Container>
      <Footer dict={dict.footer} />
    </Box>
  );
}
