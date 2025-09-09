import { useState } from 'react';
import { mutate } from 'swr';
import TranscriptApi from '../../../api/transcript/transcript';
import type { RequestCreateTranscript } from '../../../api/transcript/interfaces';

export const useCreateTranscript = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTranscript = async (data: RequestCreateTranscript) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await TranscriptApi.create(data);

      mutate('/api/transcript');

      return response.data?.id || response.data?.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTranscript,
    isLoading,
    error
  };
};