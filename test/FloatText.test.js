import React from 'react';
import styled from 'styled-components';
import Icon from '../src/components/Icon';
import FloatText from '../src/components/FloatText';

const Prompt = styled.div`
  position: absolute;
  top: 0.6em;
  right: 1.3em;
  width: 20em;
  text-align: right;
  color: #aaaaaa;

  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;

  & > span {
    position: relative;
    top: 4px;
    right: 4px;
  }
`;

describe('Floating Text', () => {
  let text;

  global.___loader = {
    enqueue: jest.fn()
  };

  beforeEach(() => {
    text = render(
      <FloatText from={-5} to={-1}>
        <Prompt show={true}>
          There's more!
          <span style={{ position: 'relative', top: '1.2em', right: '0.7em' }}>
            <Icon
              name="cornerSlantedRightUp"
              size="2.5em"
              color="#AAAAAA"
              fillColor="#AAAAAA"
            />
          </span>
        </Prompt>
      </FloatText>
    );
  });

  describe('default state', () => {
    it('should be defined', () => {
      expect(text).toBeDefined();
    });
  });

  it('should render the floating text', () => {
    expect(text).toMatchSnapshot();
  });

  it('should render with default values', () => {
    text = render(
      <FloatText>
        <Prompt show={true}>
          There's more!
          <span style={{ position: 'relative', top: '1.2em', right: '0.7em' }}>
            <Icon
              name="cornerSlantedRightUp"
              size="2.5em"
              color="#AAAAAA"
              fillColor="#AAAAAA"
            />
          </span>
        </Prompt>
      </FloatText>
    );
    expect(text).toMatchSnapshot();
  });
});
