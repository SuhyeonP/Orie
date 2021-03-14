import { css } from '@emotion/react';
import { styled } from '../Theme';

interface CardProps{
  height?: string,
  width?: string,
}

export const CardContainer = styled.div<CardProps>(({
  height, width,
}) => css`
  width:${width};
  height:${height};
`);
