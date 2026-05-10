import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getDictionary, hasLocale } from "../../dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function NodeTsCoursePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const c = dict.nodeTsCourse;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header lang={lang} dict={{ nav: dict.nav }} />

      <Box sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Link href={`/${lang}/courses`} style={{ textDecoration: "none" }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ color: "rgba(255,255,255,0.8)", mb: 3, pl: 0, "&:hover": { color: "white", bgcolor: "transparent" } }}
            >
              {c.backLabel}
            </Button>
          </Link>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
            {c.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
            {c.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "text.secondary", mb: 6 }}>
          {c.overview}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {c.topicsHeading}
        </Typography>
        <List disablePadding sx={{ mb: 6 }}>
          {c.topics.map((topic) => (
            <ListItem key={topic} disableGutters sx={{ py: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", mr: 2, flexShrink: 0 }} />
              <ListItemText primary={topic} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mb: 6 }} />

        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          {c.detailsHeading}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 6 }}>
          {[
            { label: c.levelLabel, value: c.level },
            { label: c.durationLabel, value: c.duration },
            { label: c.formatLabel, value: c.format },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ display: "flex", gap: 2 }}>
              <Typography sx={{ fontWeight: 600, minWidth: 100 }}>{label}</Typography>
              <Typography color="text.secondary">{value}</Typography>
            </Box>
          ))}
        </Box>

        <Link href={`/${lang}/contact`} style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" sx={{ fontWeight: 700, px: 4 }}>
            {c.cta}
          </Button>
        </Link>
      </Container>

      <Footer dict={dict.footer} />
    </Box>
  );
}
