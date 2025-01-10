// funçoes =  function () {}  = () => {}
// it.only  describe.only   .only >> roda so so bloco setado
const textLong = 'ttttt'

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.initialVisit()
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenchimento', function() {
    cy.fillMandatoryFieldsAdd('Sandrao', 'Nunes', 'Nunes@nunes.com', "texto texto")
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('Prencimento usando objct', () => {
    const data = {
      firstName: 'Data',
      secundName: 'Data data',
      texto: 'Data data Data data Data data Data data',
      email: 'data@data.com'

    }
    cy.fillMandatoryFieldsAddObject(data)
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })



  it('Preenchimento - verifica - limpa', function() {
    cy.get('#firstName')
      .type('Sandro')
      .should('have.value', 'Sandro')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Nunes')
      .should('have.value', 'Nunes')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('Nunes@nunes.com')
      .should('have.value', 'Nunes@nunes.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type(textLong, {delay: 0})
      .should('have.value', textLong)
      .clear()
      .should('have.value', '')
  })

})

describe('Testes campo Email', () => {
  beforeEach(() => {
    cy.visit('src/index.html') 
    cy.get('#firstName').type('Sandro')
    cy.get('#lastName').type('Nunes')
    cy.get('#open-text-area').type(textLong, {delay: 0})

  })

  it('Menssagem Erro Email sem @', function() {
    cy.get('#email').type('Nunesnunes.com')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Menssagem Erro Email vazio', function() {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Menssagem Erro Email com ?', function() {
    cy.get('#email').type('?')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Menssagem Erro Email com virgula no  lugar do ponto', function() {
    cy.get('#email').type('Nunes@nunes,com')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

})


describe('Testes telefone', () => {
  beforeEach(() => {
    const textLong = "Texto longo Texto longo Texto longo Texto longo Texto longo Texto longo Texto longo Texto longo Texto longo "
    cy.visit('src/index.html') 
    cy.get('#firstName').type('Sandro')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('Nunes@nunes.com')
    cy.get('#open-text-area').type(textLong, {delay: 0})

  })

  it('Telefone digitando nao numeros deve continuar vazio', function() {
    cy.get('#phone')
      .type('abcdefghi')
      .should('have.value', '')
  })
  it('Checkbox telefone marcada e campo telefone vazio', function() {
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

 
})

describe('Testes primeiro e segundo nome', () => {
  beforeEach(() => {
    cy.visit('src/index.html') 
    cy.get('#email').type('Nunes@nunes.com')
    cy.get('#open-text-area').type('teste primeiro e segundo nome', {delay: 0})

  })

  it('Erro primeiro nome vazio', function() {
    cy.get('#lastName').type('Nunes')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it('Erro segundo nome vazio', function() {
    cy.get('#firstName').type('Sandro')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

})

describe('Testes Select Produtos', () => {
  beforeEach(() => {
    cy.initialVisit()
    cy.fillMandatoryFieldsAdd('Sandro', 'Nunes', 'Nunes@nunes.com', "texto texto")
  })

  it('Selecionar produto Blog', function() {
    cy.get('#product').select('Blog')
    cy.clickSubmitResult('.success')
  })

  it('Selecionar produto Mentoria', function() {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
    cy.clickSubmitResult('.success')
  })

  it('Selecionar produto Mentoria', function() {
    cy.get('#product')
      .select(4)
      .should('have.value', 'youtube')
    cy.clickSubmitResult('.success')
  })

})



describe('Testes Radio Tipo Atendimento', () => {
  beforeEach(() => {
    cy.initialVisit()
    cy.fillMandatoryFieldsAdd('Sandro', 'Nunes', 'Nunes@nunes.com', "texto texto")
  })

  it('Selecionar Tipo Atendimento Feedback', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check('feedback')
      .should('be.checked')
    cy.clickSubmitResult('.success')
  })

  it('Selecionar todos os tipo Atendimento Feedback', function() {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })

  })

})


describe('Testes check box', () => {
  beforeEach(() => {
    cy.initialVisit()
    cy.fillMandatoryFieldsAdd('Sandro', 'Nunes', 'Nunes@nunes.com', "texto texto")
  })

  it('Check todos valores e desmarca o ultimo', function() {
    cy.get('input[type="checkbox"]').check()
    cy.get('#phone-checkbox').uncheck()
  })

  it('Check telefone e erro obrigatoriedade', function() {
    cy.clock()
    cy.get('#phone-checkbox').check()
    cy.clickSubmitResult('.error')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })


})

describe('Upload de arquivos', () => {
  beforeEach(() => {
    cy.initialVisit()
    cy.fillMandatoryFieldsAdd('Sandro', 'Nunes', 'Nunes@nunes.com', "texto texto")
  })

  it('Upload arquivo valido', function() {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })
})


describe('Links nova aba', () => {
  beforeEach(() => {
    cy.initialVisit()
  })

  it('Verificar politica de privacidade', function() {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href' , 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa politica de privacidade removendo target', function() {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1', 'CAC TAT - Política de privacidade')
      .should('be.visible')
  })

})

describe('Rodando teste 5 vezes check box', () => {
  beforeEach(() => {
    cy.initialVisit()
    cy.fillMandatoryFieldsAdd('Sandro', 'Nunes', 'Nunes@nunes.com', "texto texto")
  })

  Cypress._.times(5, () => {

    it('Rodando teste 5 vezes Check telefone e erro obrigatoriedade', function() {
      cy.clock()
      cy.get('#phone-checkbox').check()
      cy.clickSubmitResult('.error')
      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    })

  }) 
})


describe('Valida texto das mesagens de sucess e error ', () => {
  beforeEach(() => {
    cy.initialVisit()
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

})

describe('Preenchendo compo texto com invoke ', () => {
  beforeEach(() => {
    cy.initialVisit()
  })

  it('Preenchendo compo texto com invoke e validando', () => { 
    cy.get('#open-text-area')
      .invoke('val', 'Preenchendo compo texto com invoke e validando')
      .should('have.value', 'Preenchendo compo texto com invoke e validando')
  })

})


it('Rquisição via url ', () => {

  cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)

  cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')

  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
})