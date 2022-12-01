var crypto = require('crypto');

describe('Jess', () => {
  it('is leaving us and it is OK', () => {
    const algorithm = 'aes-256-ctr'
    const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

    const encrypt = text => {
      const iv = crypto.randomBytes(16)
      const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
      const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
      return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
      }
    }

    const decrypt = hash => {
      const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
      const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
      return decrypted.toString()
    }
    function middlePoint(p1, p2) {
      return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2
      };
    }

    const array = [
      [
        { x: 300, y: 400 },
        { x: 350, y: 400 },
        { x: 400, y: 450 },
        { x: 450, y: 400 },
        { x: 500, y: 400 },
        { x: 550, y: 450 },
        { x: 400, y: 650 },
        { x: 250, y: 450 },
        { x: 300, y: 400 },
      ]
      
    ]
    cy.viewport(1200, 1000)
    cy.visit('http://localhost:4433')


    cy.window().then((win) => {
      const colors = ['#9AC3FF', '#8DBBFF', '#81B4FF', '#74ACFF', '#68A5FF', '#5B9DFF', '#4F96FF', '#428EFF', '#3587FF', '#287FFF', '#1C78FF', '#0F70FF', '#0269FF', '#0060FF', '#0057FF', '#004FFF', '#0046FF', '#003DFF', '#0035FF', '#002CFF', '#0023FF', '#001BFF', '#0012FF', '#0009FF', '#0000FF']

      const ctx = win.document.getElementById('canvas').getContext('2d');

      const cryptedText = {
        content: "3a93d221909bdfe1912455d456caac655e5b5b2e17704d53500c0f8c87897d1a95971e59b0116bc7fc165b1562c81f907dbd97ad05b3dd905354b1e5d5de4df4c3de5fb5d8bfe06c98a5614a0f428ea9988557d5a53969f96ba21db8826452b91f936d68724d"
        , iv: "9914c1375e2ee1a7c993c78aadbd16b6"
      }
      const text = decrypt(cryptedText);
      ctx.font = 'bold 30px Courier New';
      cy.wrap(text.split('\n')).each((line, index1) => {
        cy.wrap(line.split('')).each((element, index2) => {
          cy.log(element).then(() => {
            ctx.fillStyle = colors[index2 % colors.length];
            ctx.fillText(element, 20 * index2, 50 + index1 * 50);
          })
          cy.wait(100);
        });
      })
    })
    array.forEach((line) => {
      line.forEach((item, index) => {
        if (index === line.length - 1) return;
        cy.get('canvas#canvas')
          .trigger('mousedown', { x: item.x, y: item.y, })
          .trigger('mousemove', { x: item.x, y: item.y, })
          .trigger('mousemove', middlePoint({ x: item.x, y: item.y }, { x: line[index + 1].x, y: line[index + 1].y }))
          .trigger('mousemove', { x: line[index + 1].x, y: line[index + 1].y, })
          .trigger('mouseup')
      })
    })

    cy.get('body').should(() => {
      expect({ name: 'Jess', status: '', inMind: '' }).to.deep.equal({ name: 'Jess', status: 'happyInNewJob', inMind: 'tandemTeam' });
    })
  })
})