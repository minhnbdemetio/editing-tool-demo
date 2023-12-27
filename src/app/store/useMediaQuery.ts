import { create } from 'zustand';

const useMediaQuery = create<{
  device: 'mobile' | 'desktop';
  setDevice: (device: 'mobile' | 'desktop') => void;
}>(set => ({
  device: 'mobile',
  setDevice: (device: 'mobile' | 'desktop') => set(_ => ({ device })),
}));

export default useMediaQuery;
