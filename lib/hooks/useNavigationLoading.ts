import { useState } from 'react';

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLoading = () => {
    setIsLoading(true);
  };

  const handleStopLoading = () => {
    setIsLoading(false);
  };

  return {
    isLoading,
    handleStartLoading,
    handleStopLoading,
  };
}
