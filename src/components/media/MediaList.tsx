import { forwardRef } from "react";

interface MediaListProps {
  children?: React.ReactNode;
}

export const MediaList = forwardRef<HTMLDivElement, MediaListProps>(
  (props, ref) => {
    return (
      <div
        className="flex flex-row items-center gap-6 overflow-auto relative"
        ref={ref}
      >
        {props.children}
      </div>
    );
  },
);
