"use client";

import { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface HeaderDict {
  nav: { services: string; about: string; courses: string; contact: string };
}

interface HeaderProps {
  lang: string;
  dict: HeaderDict;
}

export default function Header({ lang, dict }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const otherLang = lang === "en" ? "no" : "en";
  const otherLangLabel = lang === "en" ? "NO" : "EN";

  const navLinks = [
    { label: dict.nav.services, href: `/${lang}#services` },
    { label: dict.nav.about, href: `/${lang}/about` },
    { label: dict.nav.courses, href: `/${lang}/courses` },
    { label: dict.nav.contact, href: `/${lang}/contact` },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href={`/${lang}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/output-onlinepngtools.png"
              alt="Codefjell"
              style={{ display: "block", height: 64, backgroundColor: "white", borderRadius: 32, width: "auto" }}
            />
          </Link>
        </Box>

        {/* Desktop nav */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
          {navLinks.map((link) => (
            <Button key={link.href} color="inherit" component={Link} href={link.href}>
              {link.label}
            </Button>
          ))}
          <Button
            color="inherit"
            component={Link}
            href={`/${otherLang}`}
            sx={{ ml: 1, border: "1px solid rgba(255,255,255,0.6)", minWidth: 48 }}
          >
            {otherLangLabel}
          </Button>
        </Box>

        {/* Mobile: language toggle + hamburger */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            href={`/${otherLang}`}
            sx={{ border: "1px solid rgba(255,255,255,0.6)", minWidth: 48 }}
          >
            {otherLangLabel}
          </Button>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} aria-label="open menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
