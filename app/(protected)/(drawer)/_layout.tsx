import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/components/CustomDrawerContent";


export default function Layout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{headerShown: false, drawerHideStatusBarOnOpen: true}}/>
  );
}
