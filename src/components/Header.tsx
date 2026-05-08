"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface HeaderDict {
  nav: { services: string; about: string; contact: string };
}

interface HeaderProps {
  lang: string;
  dict: HeaderDict;
}

export default function Header({ lang, dict }: HeaderProps) {
  const otherLang = lang === "en" ? "no" : "en";
  const otherLangLabel = lang === "en" ? "NO" : "EN";

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={`/${lang}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/output-onlinepngtools.png"
              alt="Codefjell"
              style={{ display: "block", height: 64, backgroundColor:'white', borderRadius:32, width: "auto" }}
            />
          </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Button color="inherit" component={Link} href={`/${lang}#services`}>
            {dict.nav.services}
          </Button>
          <Button color="inherit" component={Link} href={`/${lang}#about`}>
            {dict.nav.about}
          </Button>
          <Button color="inherit" component={Link} href={`/${lang}#contact`}>
            {dict.nav.contact}
          </Button>
          <Button
            color="inherit"
            component={Link}
            href={`/${otherLang}`}
            sx={{
              ml: 1,
              border: "1px solid rgba(255,255,255,0.6)",
              minWidth: 48,
            }}
          >
            {otherLangLabel}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
