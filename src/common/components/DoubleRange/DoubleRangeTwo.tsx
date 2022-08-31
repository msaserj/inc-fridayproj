import React, {useState} from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import css from './DoubleRangeTwo.module.css'

type SuperDoubleInputPropsType = {
    onChangeRange?: (valueRange: string) => void
}

export const SuperDoubleRange: React.FC<SuperDoubleInputPropsType> = (
    {
        onChangeRange,
        ...restProps
    }
) => {
    const [valueRange, setValueRange] = useState<any>([0, 100])
    const handleChange = (sliderValues: any) => {
        setValueRange(sliderValues);
    };
    return (<>
            <div className={css.block}>
                <div>
                    <p>{valueRange[0]}</p>
                </div>
                <div className={css.range}>
                    <Range
                        {...restProps}
                        onChange={handleChange}
                        range
                        allowCross={false}
                        marks={{
                            0: `0`,
                            100: `100`
                        }}
                        min={0}
                        max={100}
                        defaultValue={[40, 60]}
                    />
                </div>
                <div>
                    <p>{valueRange[1]}</p>
                </div>
            </div>
        </>

    );
}
