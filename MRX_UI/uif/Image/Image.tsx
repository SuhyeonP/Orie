import React from 'react';
import { Container } from './styles';

const mrxLogo = 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F555cb4ae-947c-4720-a7bb-be642d9f564a%2FMakinaRocks_Logo_email.png?table=block&id=69acb833-d93f-4ceb-b2a9-5bb068464401&width=250&userId=&cache=v2';

export interface ImageProps{
  alt?: string;
  decoding?: 'async' | 'auto' | 'sync';// IE 지원 안함
  loading?: 'eager' | 'lazy';// IE, Safari 지원 안함
  src: string;
  width?: number;
  height?: number;
  ratio?:boolean;
  ratioRate?:string;// 비율
  size?: 'small' | 'medium' | 'large';
  rounded?:boolean;
  roundSize?:number;
  onClick?:()=>void;
}

const Image : React.ForwardRefRenderFunction<HTMLImageElement, ImageProps> = ({
  alt = 'alt string',
  decoding,
  loading,
  src = mrxLogo,
  width = 100,
  height = 100,
  ratio,
  ratioRate,
  size = 'medium',
  rounded,
  roundSize,
  onClick,
}) => {
  const props = {
    width, height, ratio, ratioRate, rounded, roundSize, onClick,
  };

  return (
    <Container
      alt={alt}
      src={src}
      decoding={decoding || null}
      loading={loading || null}
      className={size}
      {...props}
    />
  );
};

export default Image;
