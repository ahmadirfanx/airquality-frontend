import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { airQualityApi } from '@/services/api';
import { validateFile } from '@/utils/validators';
import { useToast } from '@/hooks/use-toast';

interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export const useFileUpload = () => {
  const { toast } = useToast();
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      // Validate file before upload
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }
      return airQualityApi.uploadFile(file);
    },
    onMutate: () => {
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
      });
    },
    onSuccess: (data) => {
      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
      });
      toast({
        title: 'Upload Successful',
        description: 'Your file has been uploaded and processing has started.',
      });
      return data;
    },
    onError: (error: any) => {
      const errorMessage = error.message || 'Upload failed';
      setUploadState({
        isUploading: false,
        progress: 0,
        error: errorMessage,
      });
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });

  const uploadFile = (file: File) => {
    return uploadMutation.mutateAsync(file);
  };

  const resetUpload = () => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
    });
    uploadMutation.reset();
  };

  return {
    uploadFile,
    resetUpload,
    isUploading: uploadState.isUploading,
    progress: uploadState.progress,
    error: uploadState.error,
    isSuccess: uploadMutation.isSuccess,
    data: uploadMutation.data,
  };
};