import { parseISO, format } from 'date-fns';

/** Renders an ISO date string as e.g. "May 31, 2026" in a <time> element. */
export default function PostDate({
  dateString,
  className,
}: {
  dateString: string;
  className?: string;
}) {
  return (
    <time dateTime={dateString} className={className}>
      {format(parseISO(dateString), 'LLLL d, yyyy')}
    </time>
  );
}
