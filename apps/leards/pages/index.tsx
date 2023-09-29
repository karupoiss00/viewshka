import Start from "../components/screens/start/Start";
import TextField from "libs/uikit/src/lib/textField/TextField";

export function Index() {
  return (
    <div style={{width: 500}}>
      <TextField
        placeholder="Пиши..." 
        onChange={str => {console.log(str)}}
        onInput={str => {console.log(str)}}
        contentHidden = {true}
        validate={str => {return false}}
        errorMessage="Научись писать"
      />
    </div>
  );
}

export default Index;
