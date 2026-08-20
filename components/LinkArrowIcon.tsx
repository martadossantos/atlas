type Props = {
  className?: string;
};

export function LinkArrowIcon({ className }: Props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3.78241 2.52898L9.60588 2.39355L9.47045 8.21702M9.38803 2.51616L2.3457 9.55849" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
