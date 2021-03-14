import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ImageStyleProps{
  width?:number,
  height:number,
  src?:string,
  repeat?:string|undefined,
  imageWidth?:number,
  imageHeight?:number,
  opacity?:number,
}

export const Container = styled.div<ImageStyleProps>(({
  width, height, src, repeat, imageWidth, imageHeight, opacity,
}) => css`
  width:${`${width.toString()}px`};
  height:${`${height.toString()}px`};
  margin:0;

  vertical-align: top;

  background: url(${src});
  background-repeat: ${repeat === undefined ? 'no-repeat' : repeat};
  background-size: ${`${(imageWidth).toString()}px`} ${`${(imageHeight).toString()}px`};
  opacity: ${opacity};

    &.small {
      width:${`${(width / 2).toString()}px`};
      height:${`${(height / 2).toString()}px`};

      background-size: ${`${(imageWidth).toString()}px`} ${`${(imageHeight).toString()}px`};
    }

    &.large {
      width:${`${(width * 2).toString()}px`};
      height:${`${(height * 2).toString()}px`};

      background-size: ${`${(imageWidth).toString()}px`} ${`${(imageHeight).toString()}px`};
    }
  `);
