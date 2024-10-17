import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="relative -top-16 flex items-center justify-center h-screen w-full">
      <Spinner
        aria-label="Loading"
        size="xl"
        color="info"
      />
      <span className="ml-3 text-lg font-medium text-gray-700 dark:text-gray-200">
        Loading...
      </span>
    </div>
  );
}
