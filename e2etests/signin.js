export default {
  'Sigup Test': (client) => {
    client
      .url('http://localhost:3000/signup')
      .waitForElementVisible('body', 10)
      .assert.title('PostIt')
      .assert.visible('input[name=username]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=phone]')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=repassword]')
      .assert.visible('button[type=submit]')
      .setValue('input[name=username]', 'Fann')
      .setValue('input[name=email]', 'kenee@email.com')
      .setValue('input[name=phone]', '23470707000')
      .setValue('input[name=password]', 'kene')
      .setValue('input[name=repassword]', 'kene')
      .click('button[type=submit]')
      .pause(1000)
      // .assert.urlEquals('http://localhost:3000/')
      .end();
  },
  'Sigin Test': (client) => {
    client
      .url('http://localhost:3000')
      .waitForElementVisible('body', 10)
      .assert.title('PostIt')
      .assert.visible('input[type=text]')
      .assert.visible('input[type=password]')
      .assert.visible('button[type=submit]')
      .setValue('input[type=text]', 'Kene')
      .setValue('input[type=password]', 'kene')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlEquals('http://localhost:3000/dashboard')
      .end();
  }
};

