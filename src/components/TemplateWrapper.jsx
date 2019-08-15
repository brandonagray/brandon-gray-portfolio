/*
  TEMPLATE_WRAPPER.JS
    A wrapper container designed to fit individual web pages.
    Allows consistent positioning and styling of components like
    the header, footer, and smooth transition between pages.
*/

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import NavMenu from './NavMenu';
import Transition from './Transition';

// Global styles go here!
const TemplateContainer = styled.div`
  font-family: 'Cabin', sans-serif;
  color: #464646;
  position: absolute;
  top: ${props => (props.outerBounds && props.outerBounds.top) || 0};
  left: ${props => (props.outerBounds && props.outerBounds.left) || 0};
  right: ${props => (props.outerBounds && props.outerBounds.right) || 0};
  bottom: ${props => (props.outerBounds && props.outerBounds.bottom) || 0};
`;

const NonNavElements = styled.div`
  opacity: ${props => (props.shouldFade ? 0.4 : 1)};
  transition: 0.5s opacity;
`;

class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: props.menu,
      showHeader: props.header,
      showFooter: props.footer,
      title: props.title,
      menuFocused: false
    };
  }

  handleFocus(menuFocused) {
    this.setState({ menuFocused });
    this.props.focusCallback(menuFocused);
  }

  render() {
    return (
      <TemplateContainer outerBounds={this.props.outerBounds}>
        <Helmet>
          <title>{this.state.title}</title>
          <meta
            name="description"
            content="Personal website/portfolio of Brandon Gray, front end web developer and UI designer. I love bringing great things to life!"
          />
          <meta
            name="keywords"
            content="Brandon, Gray, brandongray, brandonagray, developer, front end, designer, website, portfolio, projects, work, experience, resume, contact, gatsby, react"
          />
          <link
            rel="icon"
            href="/img/misc/logo_square.png"
            sizes={['16x16', '32x32', '64x64']}
            type="image/png"
          />
        </Helmet>
        <Transition>
          {this.state.menu ? (
            <NavMenu
              className="navMenu"
              options={this.state.menu}
              wrapperHandleFocus={focused => this.handleFocus(focused)}
              curPage={this.props.curPage}
            />
          ) : null}
          <NonNavElements
            shouldFade={this.state.menuFocused}
            id="nonNavElements"
          >
            {this.state.showHeader ? (
              <PageHeader
                className="pageHeader"
                title={this.state.showHeader}
              />
            ) : null}
            {this.props.children}
            {this.state.showFooter ? (
              <PageFooter className="pageFooter" />
            ) : null}
          </NonNavElements>
        </Transition>
      </TemplateContainer>
    );
  }
}

export default TemplateWrapper;
