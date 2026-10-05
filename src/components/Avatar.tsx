import { motion } from 'framer-motion';
import type { ImgHTMLAttributes } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
};

const Avatar = ({ src, alt = '', size = 'md', className = '', ...props }: AvatarProps) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`rounded-full ${sizeClasses[size]} object-cover ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      {...props}
    />
  );
};

export default Avatar;
export { Avatar };