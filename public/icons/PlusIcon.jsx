export const PlusIcon = ({size, height, width, ...props}) => {
    // avoid passing non-DOM attributes to svg
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {isSelected, isIndeterminate, disableAnimation, ...otherProps} = props;
  
    return (
      <svg
        fill="none"
        height={size || height || 24}
        viewBox="0 0 24 24"
        width={size || width || 24}
        xmlns="http://www.w3.org/2000/svg"
        {...otherProps}
      >
        <path
          d="M6 12H18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M12 18V6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    );
  };