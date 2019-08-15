import React from 'react';
import styled from 'styled-components';
import { mediaSize } from '../data/configOptions';

const ResumeContainer = styled.a`
  position: relative;
  width: 50%;
  display: inline-block;

  transform: translateY(0);

  transition: transform 500ms;

  &:hover {
    transform: translateY(-5px);
  }

  &:before {
    /* Position the pseudo-element. */
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 5px;

    /* Create the box shadow at expanded size. */
    box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.2);
  }

  & img {
    max-width: 100%;
  }

  ${mediaSize.tablet`
    width: 90%;
  `};
`;

const ResumeBox = props => (
  <ResumeContainer href={props.downloadSource} target="_blank">
    <img src={props.previewSource} alt="Brandon's resume" />
  </ResumeContainer>
);

export default ResumeBox;
