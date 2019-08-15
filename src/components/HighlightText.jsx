/*
  HIGHLIGHT_TEXT.JS
    Wrapper around text that draws an offset highlight on focus/hover
    or a custom trigger. Color can be configured. The toggle for drawing
    the highlight relies on its parent component to pass it the flag.
*/

import React from 'react';
import styled, { css } from 'styled-components';
import { mediaSize } from '../data/configOptions';

const Highlight = styled.span`
  position: relative;
  z-index: 110;
  width: 100%;

  &:before {
    /* background of title on hover */
    background-color: ${props => props.color};
    opacity: 0.6;
    content: '';
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    right: -5px;
    height: 100%;
    width: 0;
    z-index: -1;

    transition: 250ms ease width;

    ${props =>
      props.hovered
        ? css`
            width: 95%;
            ${mediaSize.phone`
        width: 100%;
      `};
          `
        : null} ${mediaSize.phone`
      top: 0.4em;
      float: none;
      height: 0.9em;
      left: -3px;
      opacity: 0.75;
    `};
  }
`;

const HighlightText = props => (
  <Highlight color={props.color} hovered={props.hovered}>
    {props.children}
  </Highlight>
);

export default HighlightText;
