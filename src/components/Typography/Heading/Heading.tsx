import React from 'react';

export type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
}

const Heading: React.FC<HeadingProps> = ({
  variant: Tag = 'h2',
  children,
  ...props
}) => {
  return <Tag {...props}>{children}</Tag>;
};

export default Heading;