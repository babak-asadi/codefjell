import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface FooterDict {
  tagline: string;
  copyright: string;
}

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText", py: 6, mt: "auto" }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Codefjell
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85, mb: 3 }}>
          {dict.tagline}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.6 }}>
          {dict.copyright}
        </Typography>
      </Container>
    </Box>
  );
}
