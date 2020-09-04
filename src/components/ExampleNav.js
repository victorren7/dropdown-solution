/*
  ----BUG FIXES----

  1. First thing I did was moved the state from the Dropdown(child) component to the 
  ExampleNav(parent) component because information always comes down from the parent.

  2. Added the bind for Toggle because there wasn't any

  3. Passed down toggle as its own prop and not under Onclick so it could actually work

  4.Added a second state (openedDropdown) so it could help me with the HideDropdown Function

  5. Created a HideDropdown function so that the dropdowns close when you click on the other one

  6. Added eventListiner to Toggle so it could close when you clicked on anywhere on the page

  7. Added a second bind for HideDropdown

  8. Added onClick and onClose props to the button tag inside Dropdown

  9. In Dropdown added a codnitional so it only shows children when the dropdown is open

  10. In DropdownItem I passed the children so that the numbers can show

  ----IMPROVEMENTS----

  1. I would first of all put all the classes into their own files

  2. I would transform all the class components into Functional components and use hooks for the state

  3. And always important to add styling to the code

  4. if necessary I would create an array of pages and map through the DropdownItems so it can get rid of repetition

  ----FOLLOW UP QUESTION----

  The app.sync('PATCH') method would be living in the server which would be in the backend file

 */

import React, {PureComponent} from 'react';

class ExampleNav extends PureComponent {
  //moved the state to Parent component
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      //created a new state so both dropdowns aren't opened at the same time
      openedDropdown: null,
    };
    // bind was missing
    this.toggle = this.toggle.bind(this);
    //Second one added for the hide Dropdown function
    this.hideDropdown = this.hideDropdown.bind(this);
  }

  toggle() {
    // Adding eventListener so it removes dropdown
    this.setState({ isOpen: true }, () => {
      document.addEventListener('click', this.hideDropdown);
    });    
  }

  //Adding a function so I can hide the dropdown
  hideDropdown() {
    this.setState({ 
      isOpen: false,
      openedDropdown: null 
    }
    , () => {
      document.removeEventListener('click', this.hideDropdown);
    });
  }

  render() {
    return (
      <nav>
        <a href="/page1">Page 1</a>
        <Dropdown   
          label="More items" 
          {...this.state} 
          toggle={this.toggle}
          isOpen={this.state.openedDropdown === 1}
          onClick={() => this.setState({openedDropdown: 1})}
          onClose={this.hideDropdown} 
        >
          <DropdownItem href="/page2">Page 2</DropdownItem>
          <DropdownItem href="/page3">Page 3</DropdownItem>
          <DropdownItem href="/page4">Page 4</DropdownItem>
        </Dropdown>
        <Dropdown 
          label="Even more items" 
          {...this.state} 
          toggle={this.toggle}
          isOpen={this.state.openedDropdown === 2}
          onClick={() => this.setState({ openedDropdown: 2 })}
          onClose={this.hideDropdown}
          >
          <DropdownItem href="/page5">Page 5</DropdownItem>
          <DropdownItem href="/page6">Page 6</DropdownItem>
        </Dropdown>
      </nav>
    );
  }
}

class Dropdown extends PureComponent {
  // moving the state to the parent component

  render() {
    const {isOpen, label, children, onClick, onClose} = this.props;

    return (
      <div className="dropdown">
        <button 
          type="button" 
          className="dropdown-button" 
          id="dropdownButton" 
          aria-haspopup="true" 
          aria-expanded={this.isOpen} 
          onClick={() => onClick()} 
          onClose={() => onClose()}
      >
        {label}
      </button>
        <ul className={`${isOpen ? 'dropdown-open' : ''} dropdown-menu`}  aria-labelledby="dropdownButton" role="menu">
          {/* conditional so that it opens when you onClick */}
          { isOpen ? children :  null}
        </ul>
      </div>
    );
  }
}

class DropdownItem extends PureComponent {
  render() {
    // TODO implement me
    // Passing down the children props
    const {children} = this.props
    return (
      <div>
        {children}
      </div>
      )

  }
}


export default ExampleNav;