module.exports = function (plop) {
  // controller generator
  plop.setGenerator('comp', {
    description: 'create a component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'component name',
    }],
    actions: [
      {
        type: 'add',
        path: '../../src/components/{{name}}/index.js',
        templateFile: '../index.hbs',
      },
      {
        type: 'add',
        path: '../../src/components/{{name}}/src/{{name}}.vue',
        templateFile: '../component.hbs',
      },
    ],
  });
};
