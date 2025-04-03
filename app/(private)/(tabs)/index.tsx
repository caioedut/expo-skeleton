import * as React from 'react';
import { View } from 'react-native';

import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';

import Icon from '@/components/Icon';
import ScreenOptions from '@/components/ScreenOptions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Page() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  return (
    <>
      <ScreenOptions title="Início" />

      <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader className="items-center">
            <Avatar className="w-24 h-24" alt="Rick Sanchez's Avatar">
              <AvatarImage source={require('@/assets/images/rick.jpg')} />
              <AvatarFallback>
                <Text>RS</Text>
              </AvatarFallback>
            </Avatar>
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">Rick Sanchez</CardTitle>
            <View className="flex-row">
              <CardDescription className="text-base font-semibold">Scientist</CardDescription>
              <Tooltip delayDuration={150}>
                <TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
                  <Icon className="w-4 h-4" name="information-outline" size={14} />
                </TooltipTrigger>
                <TooltipContent className="py-2 px-4 shadow">
                  <Text className="native:text-lg">Freelance</Text>
                </TooltipContent>
              </Tooltip>
            </View>
          </CardHeader>
          <CardContent>
            <View className="flex-row justify-around gap-3">
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Dimension</Text>
                <Text className="text-xl font-semibold">C-137</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Age</Text>
                <Text className="text-xl font-semibold">70</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-muted-foreground">Species</Text>
                <Text className="text-xl font-semibold">Human</Text>
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-col gap-3 pb-0">
            <View className="flex-row items-center overflow-hidden">
              <Text className="text-sm text-muted-foreground">Productivity:</Text>
              <LayoutAnimationConfig skipEntering>
                <Animated.View key={progress} className="w-11 items-center" entering={FadeInUp} exiting={FadeOutDown}>
                  <Text className="text-sm font-bold text-primary">{progress}%</Text>
                </Animated.View>
              </LayoutAnimationConfig>
            </View>
            <Progress className="h-2" indicatorClassName="bg-primary" value={progress} />
            <View />
            <Button className="shadow shadow-foreground/5" variant="outline" onPress={updateProgressValue}>
              <Text>Update</Text>
            </Button>
          </CardFooter>
        </Card>
      </View>
    </>
  );
}
