"use client";

import { useActionState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { submitContact, type ContactState } from "@/app/actions/contact";

interface ContactFormDict {
  name: string;
  email: string;
  message: string;
  submit: string;
  success: string;
  error: string;
}

const initialState: ContactState = { status: "idle" };

export default function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [state, action, isPending] = useActionState(submitContact, initialState);

  return (
    <Box component="form" action={action} noValidate sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {state.status === "success" && (
        <Alert severity="success">{dict.success}</Alert>
      )}
      {state.status === "error" && (
        <Alert severity="error">{state.message || dict.error}</Alert>
      )}
      <TextField
        name="name"
        label={dict.name}
        required
        fullWidth
        disabled={isPending || state.status === "success"}
      />
      <TextField
        name="email"
        label={dict.email}
        type="email"
        required
        fullWidth
        disabled={isPending || state.status === "success"}
      />
      <TextField
        name="message"
        label={dict.message}
        multiline
        rows={5}
        required
        fullWidth
        disabled={isPending || state.status === "success"}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isPending || state.status === "success"}
        sx={{ alignSelf: "flex-start", px: 4 }}
      >
        {isPending ? <CircularProgress size={24} color="inherit" /> : dict.submit}
      </Button>
    </Box>
  );
}
