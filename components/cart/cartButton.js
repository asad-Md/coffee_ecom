export default function CartButton({ children, onClick , disabled, type }) {
    const roundedProp = type === 'subtract' ? 'rounded-l-xl' : 'rounded-r-xl';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 bg-primary text-accent rounded ${roundedProp} hover:bg-accent hover:text-primary transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
}
