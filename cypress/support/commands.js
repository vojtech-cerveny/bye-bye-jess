// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'


Cypress.Commands.add('encrypt', (text) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  }
 })


Cypress.Commands.add('decrypt', (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

  return decrpyted.toString()
 })