import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ImageStyleProps{
  width?:number,
  height:number,
  ratio?:boolean,
  ratioRate?:string,
  rounded?:boolean,
  roundSize?:number,
}

export const Container = styled.img<ImageStyleProps>(({
  width, height, ratio, ratioRate, rounded, roundSize,
}) => {
  let rateX:number;
  let rateY:number;
  if (ratio) {
    const temp = ratioRate.split('/');
    rateX = (Number(temp[0]) * 10);
    rateY = (Number(temp[1]) * 10);
  } else {
    rateX = width;
    rateY = height;
  }

  return css`
  width:${`${rateX.toString()}px`};
  height:${`${rateY.toString()}px`};
  border-radius: ${rounded ? `${roundSize.toString()}px` : '0px'};

  background-color: antiquewhite;

    &.small {
      width:${`${(rateX / 2).toString()}px`};
      height:${`${(rateY / 2).toString()}px`};
    }

    &.large {
      width:${`${(rateX * 2).toString()}px`};
      height:${`${(rateY * 2).toString()}px`};
    }
  `;
});
