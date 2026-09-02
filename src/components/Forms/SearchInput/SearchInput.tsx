import { FC } from 'react';
import { IconDefinitions } from '../../../lib/utils/definitions';
import Icon from '../../UI/Icons/Icon/Icon';
import { Input, InputProps } from '../Input/Input';

export interface SearchInputProps extends InputProps {
    placeholder?: string;
    onTextInput?: (val: string) => void;
    size?: "sm" | "md" | "lg" | "xl";
}

const SearchInput: FC<SearchInputProps> = ({ size, placeholder = 'Zoeken...', onTextInput, ...rest }) => {
    return (
        <div className={`search-input ${size ? 'search-input--' + size : ''}`}>
            <Input placeholder={placeholder} onValueChange={onTextInput} {...rest} />
            <Icon icon={IconDefinitions.search} />
        </div>
    );
};

export default SearchInput;
