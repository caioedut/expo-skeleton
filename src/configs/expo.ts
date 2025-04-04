import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });
cssInterop(DrawerItem, { className: 'style' });
cssInterop(DrawerContentScrollView, { className: 'style' });
