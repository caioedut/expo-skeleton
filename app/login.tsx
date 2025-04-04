import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormField, FormInput } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { H1 } from '@/components/ui/typography';
import useAuth from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Page() {
  const auth = useAuth();

  const form = useForm<LoginData>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin({ email, password }: LoginData) {
    await auth.login(email, password);
    router.replace('/(private)/(nav)');
  }

  return (
    <View className="container mx-auto flex-1 justify-center p-6 max-w-md">
      <Form {...form}>
        <Card className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl">
          <H1 className="text-center mb-8">Faça Login</H1>

          <View className="gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  autoCapitalize="none"
                  autoComplete="email"
                  label="E-mail"
                  placeholder="name@email.com"
                  submitBehavior="submit"
                  onSubmitEditing={() => form.watch('email') && form.setFocus('password')}
                  {...field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  secureTextEntry
                  autoComplete="password"
                  label="Password"
                  placeholder="********"
                  submitBehavior="submit"
                  onSubmitEditing={() => form.watch('password') && form.handleSubmit(handleLogin)()}
                  {...field}
                />
              )}
            />

            <Button className="mt-2" onPress={form.handleSubmit(handleLogin)}>
              <Text>Entrar</Text>
            </Button>
          </View>
        </Card>
      </Form>
    </View>
  );
}
