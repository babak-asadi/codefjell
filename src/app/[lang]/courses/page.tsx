import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getDictionary, hasLocale } from "../dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function CoursesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const courses = [
    { slug: "system-design", title: dict.systemDesignCourse.title, subtitle: dict.systemDesignCourse.subtitle },
    { slug: "react-typescript", title: dict.reactTsCourse.title, subtitle: dict.reactTsCourse.subtitle },
    { slug: "node-typescript", title: dict.nodeTsCourse.title, subtitle: dict.nodeTsCourse.subtitle },
    { slug: "javascript-beginners", title: dict.jsBegCourse.title, subtitle: dict.jsBegCourse.subtitle },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header lang={lang} dict={{ nav: dict.nav }} />
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, flexGrow: 1 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          {dict.coursesPage.heading}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
          {dict.coursesPage.subtitle}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {courses.map((course) => (
            <Card
              key={course.slug}
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}
            >
              <Link href={`/${lang}/courses/${course.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <CardActionArea sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.subtitle}
                      </Typography>
                    </Box>
                    <ArrowForwardIcon sx={{ color: "primary.main", ml: 2, flexShrink: 0 }} />
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Box>
      </Container>
      <Footer dict={dict.footer} />
    </Box>
  );
}
