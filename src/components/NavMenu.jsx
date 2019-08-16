import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import posed from 'react-pose';
import { isMobile } from 'react-device-detect';
import onClickOutside from 'react-onclickoutside';

import '../data/hamburgers/hamburgers.scss';
import { menuPageOptions, mediaSize } from '../data/configOptions';

import HighlightText from './HighlightText';
import FloatText from './FloatText';
import Icon from './Icon';

const MenuConfig = {
  enter: {
    scale: 0,
    rotate: 0
  },
  closed: {
    scale: 1,
    rotate: 45,
    afterChildren: true
  },
  open: {
    scale: 1.2,
    rotate: 0,
    delayChildren: 50,
    staggerChildren: 100
  }
};

const MenuLinkConfig = {
  closed: {
    opacity: 0,
    scale: 0,
    x: -50,
    transition: {
      x: { delay: 50 }
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    x: 0
  }
};

const MenuContainer = styled.div`
  position: fixed;
  right: 11%;
  display: inline-block;
  z-index: 100; // Allow menu to always be on top for navigation

  ${props =>
    props.default
      ? null
      : mediaSize.phone`
    right: auto;
    bottom: 7%;
    left: 11%;
  `};
`;

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

const Menu = styled(posed.div(MenuConfig))`
  width: 2.5em;
  height: 2.5em;
  background-color: #85cee8;
  opacity: 1;

  grid-area: menu;

  &:hover {
    cursor: pointer;
  }

  & .hamburger {
    position: relative;
    top: 0.2em;
    left: 0.1em;
  }
`;

const MenuLink = styled(posed.div(MenuLinkConfig))`
  text-align: justify;
  direction: rtl;
  padding-top: 0.5em;
  float: right;
  width: 125px;

  & a {
    text-decoration: none;
  }

  ${props =>
    props.default
      ? mediaSize.phone`
      padding-top: 0.25em;
    `
      : mediaSize.phone`
    direction: ltr;
    float: none;
    position: relative;
    top: ${props => props.mobileoffset * -50}px;

    &:nth-child(2) {
      margin-top: -4.5em;
    }
  `};
`;

const MenuLinkText = styled.div`
  padding-right: 5px;
  opacity: 1;
  color: #545454;
  width: 100%;
`;

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      menuLink: null,
      displayPrompt: this.props.options && this.props.options.prompt
    };
  }

  componentDidMount() {
    // Dismiss prompt to open menu after 8 seconds
    this.promptTimer = setTimeout(() => {
      this.setState({ displayPrompt: false });
    }, 8000);
  }

  componentWillUnmount() {
    clearTimeout(this.promptTimer);
  }

  handleClickOutside = evt => {
    this.handleFocus('clickAway');
  };

  handleFocus(action) {
    if (action === 'hover' && !isMobile) {
      this.setState({
        menuOpen: true,
        displayPrompt: false
      });
      this.props.wrapperHandleFocus(true);
    } else if (
      (action === 'hoverAway' && !isMobile) ||
      (action === 'clickAway' && isMobile)
    ) {
      this.setState({ menuOpen: false });
      this.props.wrapperHandleFocus(false);
    } else if (action === 'click' && isMobile) {
      this.setState(prevState => {
        this.props.wrapperHandleFocus(!prevState.menuOpen);
        return {
          menuOpen: !prevState.menuOpen,
          displayPrompt: false
        };
      });
    }
  }

  render() {
    return (
      <MenuContainer default={this.props.options && this.props.options.default}>
        <FloatText from={-5} to={-1}>
          <Prompt show={this.state.displayPrompt}>
            There's more!
            <span
              style={{ position: 'relative', top: '1.2em', right: '0.7em' }}
            >
              <Icon
                name="cornerSlantedRightUp"
                size="2.5em"
                color="#AAAAAA"
                fillColor="#AAAAAA"
              />
            </span>
          </Prompt>
        </FloatText>
        <Menu
          initialPose="enter"
          open={this.state.menuOpen}
          pose={this.state.menuOpen ? 'open' : 'closed'}
          onMouseEnter={() => this.handleFocus('hover')}
          onMouseLeave={() => this.handleFocus('hoverAway')}
          onClick={() => this.handleFocus('click')}
        >
          <div
            className={
              this.state.menuOpen
                ? 'hamburger hamburger--elastic is-active'
                : 'hamburger hamburger--elastic'
            }
          >
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
          {menuPageOptions.map((option, i) => {
            return (
              <MenuLink
                key={i}
                pose={this.state.menuOpen ? 'open' : 'closed'}
                default={this.props.options && this.props.options.default}
                mobileoffset={i}
              >
                <Link
                  to={option.route}
                  onMouseEnter={() => this.setState({ menuLink: option.text })}
                  onMouseLeave={() => this.setState({ menuLink: null })}
                >
                  <MenuLinkText>
                    <HighlightText
                      color={option.colour}
                      hovered={
                        ((this.state.menuLink === option.text && !isMobile) ||
                          this.props.curPage === option.text) &&
                        this.state.menuOpen
                      }
                    >
                      {option.text}
                    </HighlightText>
                  </MenuLinkText>
                </Link>
              </MenuLink>
            );
          })}
        </Menu>
      </MenuContainer>
    );
  }
}

export default onClickOutside(NavMenu);
