import React from 'react';
import { View } from 'react-native';

import { Image } from 'expo-image';
import { Redirect } from 'expo-router';

import Link from '@/components/Link';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { H1 } from '@/components/ui/typography';
import useAuth from '@/hooks/useAuth';

export default function Page() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    return <Redirect href="/(private)/(nav)" />;
  }

  return (
    <View className="container mx-auto flex-1 justify-center p-6 max-w-md">
      <Card className="p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl items-center">
        <Image
          className="w-24 h-24 mb-4 rounded-full border-4 border-white"
          source={require('@/assets/images/rick.jpg')}
        />
        <H1 className="mb-4 text-center">Bem-vindo ao Nosso App!</H1>
        <Text className="mb-6 text-center">
          Uma jornada incrível começa aqui. Explore e aproveite o que temos a oferecer.
        </Text>
        <Link asChild href="/login">
          <Button>
            <Text>Começar</Text>
          </Button>
        </Link>
      </Card>
    </View>
  );
}
