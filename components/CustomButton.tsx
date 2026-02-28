import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, TouchableOpacity } from 'react-native';

type buttonProps = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  bgColor?: string;
  textStyles?: string;
  isLoading?: boolean;
  disableButton?: boolean;
}

const CustomButton = ({ title, handlePress, containerStyles, bgColor, textStyles, isLoading, disableButton }: buttonProps) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`${bgColor ? bgColor : "bg-green"} rounded-md min-h-[52px] justify-center items-center ${containerStyles} ${isLoading || disableButton ? 'opacity-50' : ''}`} disabled={isLoading || disableButton}>
        {isLoading ? <FontAwesome5 name="circle-notch" size={20} color="white" className='animate-spin-fast'/> :
         <Text className={`font-mbold text-lg ${textStyles}`}>{title}</Text>
         }
    </TouchableOpacity>
  )
}

export default CustomButton