<%- banners.test %>
const rewire = require('rewire');

describe('<%= filename %>', () => {
  let <%= filename %>;
  beforeEach(() => {
    <%= filename %> = rewire('./<%= filename %>');
  });

  it('should do something', () => {
    expect(<%= filename %>).to.not.throw();
  });
});
