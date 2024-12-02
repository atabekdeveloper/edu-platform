import React, { useRef } from 'react';
import { IMaskInput, IMaskInputProps } from 'react-imask';

const UiPhoneIMaskInput: React.FC<IMaskInputProps<any>> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => inputRef.current && inputRef.current.focus();

  return (
    <div
      className="relative w-full border border-gray-300 rounded-lg px-2.5 py-2 transition-all duration-200 hover:border-primary"
      onClick={handleDivClick}
    >
      <span className="absolute inset-y-0 flex items-center text-gray-900 left-2">+998</span>
      <IMaskInput
        {...(props as any)}
        inputRef={inputRef}
        className="w-full pl-10 text-gray-900 placeholder-gray-400 outline-none"
        mask="00 000 00 00"
        definitions={{
          '#': /[0-9]/,
        }}
        placeholder="-- --- -- --"
      />
    </div>
  );
};

export { UiPhoneIMaskInput };
