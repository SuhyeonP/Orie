import React, { ReactNode } from 'react';
import { Typography } from '@/components/Typography';
import { CardContainer } from './styles';
import { Image } from '../Image';

export interface CardProps{
  cover?: string,
  renderItem?: ReactNode,
  height?: string,
  width?: string,
  coverRate?: number,
  title?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  cover,
  coverRate = 0.7,
  renderItem,
  height = '100px',
  width = '100px',
  title,
  ...props
}, ref) => {
  const coverImg = (cardHeight: string): string => {
    const size = cardHeight.replace(/[^0-9]/g, '');
    const unit = cardHeight.slice(size.length, cardHeight.length);
    return Number(size) * (coverRate) + unit;
  };

  if (title) {
    return (
      <CardContainer ref={ref} width={width} height={height} {...props}>
        {cover && <Image src={cover} width={width} height={coverImg(height)} />}
        <Typography as='p'>{title}</Typography>
      </CardContainer>
    );
  }

  return (
    <CardContainer ref={ref} width={width} height={height} {...props}>
      {cover && <Image src={cover} width={width} height={coverImg(height)} />}
      {renderItem}
    </CardContainer>
  );
});

export default Card;
