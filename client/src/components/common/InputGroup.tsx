import PropTypes from "prop-types";
const InputGroup = ({
  name,
  value,
  type,
  error,
  placeholder,
  className,
  onChange,
}: {
  name: string | undefined;
  placeholder: string | undefined;
  value: string | undefined;
  type: string | undefined;
  error: string | undefined;
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div>
      <div>
        <input
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          className={
            className
              ? className
              : "bg-[#F0F0F0] w-full p-4 rounded-lg border border-gray-400"
          }
        />
      </div>
      {error && <span className="text-red-600 mt-2">{error}</span>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default InputGroup;
