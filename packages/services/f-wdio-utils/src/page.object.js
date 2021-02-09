class Page {

  openComponent(componentType, path) {
    let formattedUrl = ''
    
    switch(componentType.toLowerCase()) {
      case 'atom':
        formattedUrl = `/iframe.html?id=components-atoms--${path}`
        break;
      case 'molecule':
        formattedUrl = `/iframe.html?id=components-molecules--${path}`
        break;
      case 'molecule-folder':
        formattedUrl = `/iframe.html?id=components-molecules-${path}`
        break;
      case 'organism':
        formattedUrl = `/iframe.html?id=components-organisms--${path}`
        break;
      default:
        throw new Error(`${componentType} is not a valid component type. Please use 'atom', 'molecule', or 'organism'`);
    }
    
    browser.url(formattedUrl)
  }

  waitForComponent (component) {
    component.waitForExist();
  }
}

module.exports = Page;

