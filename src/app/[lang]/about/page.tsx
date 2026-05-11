import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { getDictionary, hasLocale } from "../dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const a = dict.about;

  const rows = [
    { label: a.legalNameLabel, value: a.legalName },
    { label: a.orgLabel, value: a.org },
    { label: a.companyTypeLabel, value: a.companyType },
    { label: a.industryLabel, value: a.industry },
    { label: a.ownerLabel, value: a.owner },
    { label: a.addressLabel, value: a.address },
    { label: a.registeredLabel, value: a.registered },
    { label: a.statusLabel, value: a.status },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header lang={lang} dict={{ nav: dict.nav }} />

      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
          {a.heading}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 8, fontSize: "1.1rem" }}>
          {a.description}
        </Typography>

        <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, color: "text.secondary", display: "block", mb: 2 }}>
          {a.officialHeading}
        </Typography>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            mb: 8,
          }}
        >
          {rows.map(({ label, value }, i) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                borderBottom: i < rows.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
                "&:hover": { bgcolor: "grey.50" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "45%", sm: "35%" },
                  px: 3,
                  py: 2,
                  bgcolor: "grey.50",
                  borderRight: "1px solid",
                  borderColor: "divider",
                  flexShrink: 0,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  {label}
                </Typography>
              </Box>
              <Box sx={{ px: 3, py: 2, flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>


        <Divider sx={{ mb: 8 }} />

        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          {dict.logo.heading}
        </Typography>
        <Box sx={{ mb: 4 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/output-onlinepngtools.png"
            alt="Codefjell logo"
            style={{ height: 120, width: "auto" }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
          {dict.logo.description}
        </Typography>
      </Container>

      <Footer dict={dict.footer} />
    </Box>
  );
}
