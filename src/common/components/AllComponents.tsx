
import SuperRadio from "./c6-Radio/SuperRadio";
import InputButtonCheckbox from "./c1-InputText/InputButtonCheckbox";
import EditableSpan from "./c4-EditableSpan/EditableSpan";
import SelectRadio from "./c5-Select/SelectRadio";


export const AllComponents = () => {
    return<>
        <h1>All Components</h1>
        <InputButtonCheckbox/>
        <EditableSpan/>
        <SelectRadio/>
        <SuperRadio/>
    </>
}