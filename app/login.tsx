import { AnyObject, RbkFormEvent, useToaster } from '@react-bulk/core';
import { router } from 'expo-router';
import { z } from 'zod';

import { Box, Button, Card, Form, Grid, Input, Text } from '@/components/ui';
import { getError } from '@/helpers/api.helper';
import { prepare } from '@/helpers/form.helper';
import useAuth from '@/hooks/useAuth';

export default function Page() {
  const auth = useAuth();
  const toaster = useToaster();

  async function handleLogin(e: RbkFormEvent, payload: AnyObject) {
    try {
      const { data, errors } = prepare(payload, {
        email: z.string().email(),
        password: z.string(),
      });

      e.form.setErrors(errors);
      if (errors) return;

      const { email, password } = data;
      await auth.login(email, password);

      router.replace('/(private)/(nav)');
    } catch (err) {
      toaster.error(getError(err));
    }
  }

  return (
    <Form center flex p={8} onSubmit={handleLogin}>
      <Card center corners={4} maxw={400} p={12} shadow={8} w="100%">
        <Text bold center variant="title">
          Faça Login
        </Text>

        <Grid gap mt={4}>
          <Box xs={12}>
            <Input label="E-mail" name="email" placeholder="name@email.com" type="email" />
          </Box>
          <Box xs={12}>
            <Input label="Senha" name="password" placeholder="********" type="password" />
          </Box>
          <Box mt={4} xs={12}>
            <Button type="submit">Entrar</Button>
          </Box>
        </Grid>
      </Card>
    </Form>
  );
}
