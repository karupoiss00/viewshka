import Start from "../components/screens/start/Start";
import TextField from "libs/uikit/src/lib/textField/TextField";

export function Index() {
  return (
      <TextField 
        onChange={str => {console.log(str)}}
        onInput={str => {console.log(str)}}
        contentVisible = {true}
        isValidate={str => false}
      />
  );
}

export default Index;
