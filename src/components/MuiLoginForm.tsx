import React from "react";
import { TextField, Button, Stack, Container } from "@mui/material";
import { useForm } from "react-hook-form";

type FormValue = {
  email: string;
  password: string;
};
export function MuiLoginForm() {
  const { register } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Container>
      <h1>Login</h1>
      <form noValidate>
        <Stack>
          <TextField label="email" type="email" {...register("email")} />
          <TextField
            label="password"
            type="password"
            {...register("password")}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
