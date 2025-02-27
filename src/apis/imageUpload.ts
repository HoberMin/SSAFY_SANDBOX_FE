import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Domain } from '@/store';

interface ImageUploadResponse {
  id: number;
  imageUrl: string;
}

interface PresignedURLResponse {
  presignedUrl: string;
}

const getImageURL = async (domain: Domain) =>
  await fetch(`${domain}/upload`)
    .then(res => res.json())
    .then(data => data as ImageUploadResponse);

const getPreSignedURL = async (domain: Domain) =>
  await fetch(`${domain}/upload/presigned-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => data as PresignedURLResponse);

const putPresignedURL = async (preSignedURL: string, file: File) =>
  await fetch(preSignedURL, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

const postImageUpload = async (domain: Domain, imageUrl: string) =>
  await fetch(`${domain}/upload/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl }),
  });

export const useGetImageAPI = (domain: Domain) =>
  useQuery({
    queryKey: ['image', domain],
    queryFn: () => getImageURL(domain),
  });

export const postImageUrlAPI = (domain: Domain) => {
  const { mutate } = useMutation({
    mutationFn: (imageUrl: string) => postImageUpload(domain, imageUrl),
  });

  return mutate;
};

export const getPreSignedUrlAPI = (domain: Domain) =>
  useQuery({
    queryKey: ['preSignedURL', domain],
    queryFn: () => getPreSignedURL(domain),
  });

export const putImageAPI = (presignedUrl: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (file: File) => putPresignedURL(presignedUrl, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['image'] });
    },
  });

  return mutate;
};
