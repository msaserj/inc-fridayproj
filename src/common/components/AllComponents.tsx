import SuperRadio from "./Primitive/c6-Radio/SuperRadio";
import InputButtonCheckbox from "./Primitive/c1-InputText/InputButtonCheckbox";
import SelectRadio from "./Primitive/c5-Select/SelectRadio";
import {Loaders} from "./Primitive/c8-Loaders/Loaders";
import {SuperDoubleRange} from "./Primitive/DoubleRange/DoubleRangeTwo";
import {SmallButtonsDemo} from "./Primitive/SmallButtons/SmallButtonsDemo";
import {SuperStarRating} from "./Primitive/StarRating/SuperStarsRating";

export const AllComponents = () => {
    return<>
        <h1>All Components</h1>
        <InputButtonCheckbox/>
        <SelectRadio/>
        <SuperRadio/>
        <Loaders/>
        <SuperDoubleRange />
        <SmallButtonsDemo/>
        <SuperStarRating initialRating={2.5}/>

        <div style={{marginTop: "100px"}}/>
    </>
}