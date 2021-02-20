import React from 'react';
import { Container } from './styles';

const mrxLogo = 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F555cb4ae-947c-4720-a7bb-be642d9f564a%2FMakinaRocks_Logo_email.png?table=block&id=69acb833-d93f-4ceb-b2a9-5bb068464401&width=250&userId=&cache=v2';

export interface BackImageProps{
  alt?: string;
  decoding?: 'async' | 'auto' | 'sync';// IE 지원 안함
  loading?: 'eager' | 'lazy';// IE, Safari 지원 안함
  src: string;
  width?: number;
  height?: number;
  size?: 'small' | 'medium' | 'large';
  repeat?:string;
  onClick?:()=>void;
  imageWidth?:number;
  imageHeight?:number;
  opacity?:number;
}

const BackImage : React.ForwardRefRenderFunction<HTMLImageElement, BackImageProps> = ({
  src = mrxLogo,
  width = 100,
  height = 100,
  size = 'medium',
  repeat,
  onClick,
  imageWidth = 100,
  imageHeight = 100,
  opacity = 0.1,
}) => {
  const props = {
    width, height, onClick, repeat, src, imageWidth, imageHeight, opacity,
  };

  return (
    <Container
      className={size}
      {...props}
    />
  );
};

export default BackImage;
