import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import LanguageIcon from "@mui/icons-material/Language";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CodeIcon from "@mui/icons-material/Code";
// import TerminalIcon from "@mui/icons-material/Terminal";
import SchoolIcon from "@mui/icons-material/School";
import { getDictionary, hasLocale } from "./dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const services = [
    // { icon: <LanguageIcon sx={{ fontSize: 40 }} />, ...dict.services.portal },
    { icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />, ...dict.services.consulting },
    { icon: <CodeIcon sx={{ fontSize: 40 }} />, ...dict.services.software },
    // { icon: <TerminalIcon sx={{ fontSize: 40 }} />, ...dict.services.programming },
    { icon: <SchoolIcon sx={{ fontSize: 40 }} />, ...dict.services.education },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header lang={lang} dict={{ nav: dict.nav }} />

      {/* Hero */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, mb: 3, lineHeight: 1.15 }}
          >
            {dict.hero.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 5, fontWeight: 400 }}>
            {dict.hero.subtitle}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href={`/${lang}/contact`}
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: 700,
              px: 4,
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            {dict.hero.cta}
          </Button>
        </Container>
      </Box>

      {/* Services */}
      <Box id="services" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
          >
            {dict.services.heading}
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {services.map((service) => (
              <Grid key={service.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: "primary.main", mb: 2 }}>{service.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer dict={dict.footer} />
    </Box>
  );
}
