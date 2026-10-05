import { motion, type HTMLMotionProps } from 'framer-motion';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  padding?: CardPadding;
  children?: React.ReactNode;
}

const paddingClasses: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = ({
  children,
  padding = 'md',
  className = '',
  ...props
}: CardProps) => {
  return (
    <motion.div
      className={`bg-card rounded-xl shadow-md border border-border ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;