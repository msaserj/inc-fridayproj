import SuperRadio from "./c6-Radio/SuperRadio";
import InputButtonCheckbox from "./c1-InputText/InputButtonCheckbox";
import EditableSpan from "./c4-EditableSpan/EditableSpan";
import SelectRadio from "./c5-Select/SelectRadio";
import {Loaders} from "./c8-Loaders/Loaders";
import {SuperDoubleRange} from "./DoubleRange/DoubleRangeTwo";
import {SmallButtonsDemo} from "./SmallButtons/SmallButtonsDemo";

export const AllComponents = () => {
    return<>
        <h1>All Components</h1>
        <InputButtonCheckbox/>
        <EditableSpan/>
        <SelectRadio/>
        <SuperRadio/>
        <Loaders/>
        <SuperDoubleRange />
        <SmallButtonsDemo/>

        <div style={{marginTop: "100px"}}/>
    </>
}