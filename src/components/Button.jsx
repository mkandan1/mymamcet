import { Icon } from '@iconify/react';
import React from 'react';

export const Button = ({ bgColor, textColor, disable, icon, id, isLoading, isLoadingId, text, onClick }) => {
  const disabledBgColor = disable ? `${bgColor.split('-')[0]}-300` : bgColor;
  const disabledTextColor = disable ? `${textColor.split('-')[0]}-200` : textColor;

  return (
    <button
      className={`flex items-center justify-center py-2 px-5 gap-2 font-medium text-sm border-2 border-gray-300 font-manrope hover:opacity-90 w-auto bg-${disabledBgColor} text-${disabledTextColor} px-7`}
      onClick={() => onClick()}
      disabled={disable || isLoading} // Disable button when loading
    >
      {(icon && isLoading && isLoadingId === id) ? ( // Check if the button is loading
        <Icon
          icon={'eos-icons:three-dots-loading'}
          className={`text-md text-xl p-0 ${disable ? `gray-500` : textColor} p-0`}
          fontWeight={''}
        />
      ) : (
        <>
          {icon && (
            <Icon
              icon={icon}
              className={`text-md ${disable ? `gray-500` : textColor} p-0`}
              fontWeight={''}
            />
          )}
        </>
      )}
      {text} {/* Show text only if not loading */}
    </button>
  );
};
