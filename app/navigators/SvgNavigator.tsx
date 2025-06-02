import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { SvgScreen } from '../screens/SvgScreen';
import { SvgStackParamList } from "./SvgStackParamList";

const Stack = createNativeStackNavigator<SvgStackParamList>();

export function SvgNavigator () {
    return(
        <Stack.Navigator>
            <Stack.Screen  name='SvgScreen' component={SvgScreen} />
        </Stack.Navigator>
    );
}