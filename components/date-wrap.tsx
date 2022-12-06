import { format } from 'date-fns';

interface DateWrapProps {
  timestamp: number
}
export default function DateWrap({ timestamp }: DateWrapProps) {
  const date = new Date(timestamp);
  return <time dateTime={date.toISOString()}>{format(date, 'PPpp')}</time>;
}

