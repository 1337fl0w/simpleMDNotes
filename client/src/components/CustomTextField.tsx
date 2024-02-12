import React from 'react';

interface CustomTextFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    style?: React.CSSProperties;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    value,
    onChange,
    placeholder,
    style,
}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                padding: '10px',
                fontSize: '16px',
                border: '2px solid #ccc',
                borderRadius: '4px',
                width: '100%',
                boxSizing: 'border-box',
                ...style,
            }}
        />
    );
};

export default CustomTextField;
