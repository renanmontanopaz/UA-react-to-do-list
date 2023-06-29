describe('<Content> o página ToDo não pode ter nenhuma task na lista ao iniciar o teste', () => {
  
  beforeEach(() => {
    cy.viewport("macbook-15")
    cy.visit('http://localhost:3000/to-do')
    cy.wait(2000)
  })
  context('Quando acessar a página de toDo list, no header', () => {
    it('Deve exibir uma tag img com o logo da página', () => {
      cy.get('img').should("be.visible")
    })
    
    it('Deve conter um input de adicionar uma tarefa nova"', () => {
      cy.get('._input_x3dtl_21')
    })
    
    it('Deve conter um botão de criar tarefa desativado', () => {
      cy.get('._button_x3dtl_75').should('have.attr', 'disabled')
    })
    it('Deve criar duas tasks "task adicionada pelo cypress" e "task"', () => {
      
      cy.get(':nth-child(1) > ._span_value_x3dtl_191').invoke('text')
        .then(text => {
          const value = parseInt(text)
          expect(value).to.equal(0)
        })
      cy.get('._input_x3dtl_21').type('task adicionada pelo cypress')
      cy.get('._button_x3dtl_75').click()
      cy.wait(2000)
      cy.get('._input_x3dtl_21').type('task')
      cy.get('._button_x3dtl_75').click()
      cy.wait(2000)
      cy.get(':nth-child(1) > ._span_value_x3dtl_191').invoke('text')
        .then(text => {
          const value = parseInt(text)
          expect(value).to.be.gte(1);
        })
    })
  })
  describe('E na sessão', () => {
    context('Deve conter dois contadores', () => {
      it('Deve exibir um contador de tarefas criadas', () => {
        cy.get('._content_header_x3dtl_129 > :nth-child(1)')
      })
      it('Deve exibir um contador de tarefas concluídas', () => {
        cy.get('._content_header_x3dtl_129 > :nth-child(2)')
      })
      context('No contador de tarefas criadas', () => {
        beforeEach(() => {
          cy.wait(2000);
        })
        it('Deve exibir maior que UM quando a task "task adicionada pelo cypress" for criada', () => {
          cy.get(':nth-child(1) > ._span_value_x3dtl_191').invoke('text')
            .then(text => {
              const value = parseInt(text)
              expect(value).to.be.gte(1)
            })
        })
      })
      context('No contador de tarefas concluídas', () =>{
        beforeEach(() => {
          cy.wait(2000);
        })
        
        it('Deve mostrar a quantidade de tarefas concluídas', () => {
          cy.get(':nth-child(2) > ._span_value_x3dtl_191').invoke('text')
            .then(text => {
              const value = parseInt(text)
              expect(value).to.be.gte(0)
            })
        })
      })
      context('Na task da lista', () => {
        beforeEach(() => {
          cy.wait(1000);
        })
        it('Deve grifar a task com nome "task adicionada pelo cypress" ao clicar no checkbox de concluir task', () => {
          cy.get('input[data-testid="checkbox"]').eq(0).check();
          cy.get(':nth-child(1) > ._text_scratched_14eu5_71').eq(0).should('have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');
          cy.wait(2000)
        })
      })
      context('Na lista de task', () => {
        beforeEach(() => {
          cy.wait(1000);
        })
        it('Deve excluir as tasks ao clicar no ícone de lixeira', () => {
          cy.get(':nth-child(1) > ._span_value_x3dtl_191').invoke('text')
            .then(text => {
              const value = parseInt(text)
              expect(value).to.equal(2)
            })
          
          cy.get('._img_14eu5_85').click({ multiple: true })
          cy.wait(1000)
          cy.get(':nth-child(1) > ._span_value_x3dtl_191').invoke('text')
            .then(text => {
              const value = parseInt(text)
              expect(value).to.be.lessThan(2);
            })
        })
        it('Deve mostrar o conteúdo avisando que não tem tarefas cadastradas, quando a lista de task estiver vazia', () => {
          cy.get('._section_container_1a9zj_1').should('exist')  //nocontent
          cy.get('._section_container_14eu5_1').should('not.exist') //tasks
        })
      })
    })
  })
})