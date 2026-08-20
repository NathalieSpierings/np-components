import React, { ReactNode } from "react";
import { TagListProps, TagsList } from "./TagsInput";
import { StaticInput, StaticInputProps } from "../Input";

export type StaticTagsInputProps = Omit<StaticInputProps, "value" | "children" | "addonPrefix"> & TagListProps ;

const StaticTagsInput = ({
    selectedTags,
    setSelectedTags,
    onRemove,
    color, 
    css,
    addonPrefix,
    ...staticInputProps
} : StaticTagsInputProps) : ReactNode => (
    <StaticInput {...staticInputProps} css={`${css ?? ""}`}>
        <TagsList 
            addonPrefix={addonPrefix}
            selectedTags={selectedTags} 
            onRemove={onRemove} 
            setSelectedTags={setSelectedTags}
            color={color}
        />
    </StaticInput>
);

 export default StaticTagsInput;
